const express = require('express');
const router = express.Router();
const { Octokit } = require('octokit');
const { generateTemplateA, generateTemplateB, generateTemplateC, generateTemplateD, generateTemplateE } = require('../templates/allTemplates');

const templateMap = {
  'Terminal': generateTemplateA,
  'Glassmorphism': generateTemplateB,
  'Sidebar': generateTemplateC,
  'Gradient': generateTemplateD,
  'Minimalist': generateTemplateE,
};

router.post('/deploy', async (req, res) => {
  try {
    const { portfolioData, githubToken, repoName, templateType } = req.body;

    if (!portfolioData) {
      return res.status(400).json({ error: 'Portfolio data is required' });
    }

    if (!githubToken) {
      return res.status(400).json({ error: 'GitHub token is required' });
    }

    const octokit = new Octokit({ auth: githubToken });

    const user = await octokit.rest.users.getAuthenticated();
    const username = user.data.login;

    const templateGenerator = templateMap[templateType] || templateMap['Minimalist'];
    const { html, css, js } = templateGenerator(portfolioData);

    try {
      await octokit.rest.repos.createForAuthenticatedUser({
        name: repoName,
        description: `Portfolio of ${portfolioData.fullName}`,
        private: false,
        auto_init: true,
      });
    } catch (error) {
      if (error.status === 422 && error.errors?.[0]?.message?.includes('already exists')) {
        return res.status(400).json({ error: 'Repository name already exists. Please choose a different name.' });
      }
      throw error;
    }

    const files = {
      'index.html': html,
      'styles.css': css,
      'script.js': js,
      'README.md': `# ${portfolioData.fullName}'s Portfolio\n\nWelcome to my developer portfolio!`,
    };

    for (const [path, content] of Object.entries(files)) {
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: username,
        repo: repoName,
        path,
        message: `Add ${path}`,
        content: Buffer.from(content).toString('base64'),
      });
    }

    await octokit.rest.repos.enablePages({
      owner: username,
      repo: repoName,
    });

    const liveUrl = `https://${username}.github.io/${repoName}`;

    res.json({
      success: true,
      liveUrl,
      repoUrl: `https://github.com/${username}/${repoName}`,
      message: 'Portfolio deployed successfully!',
    });

  } catch (error) {
    console.error('Deployment error:', error);
    if (error.status === 401) {
      return res.status(401).json({ error: 'Invalid GitHub token. Please check and try again.' });
    }
    res.status(500).json({ error: error.message || 'Failed to deploy portfolio' });
  }
});

router.post('/verify-token', async (req, res) => {
  try {
    const { githubToken } = req.body;
    
    if (!githubToken) {
      return res.status(400).json({ valid: false, error: 'Token is required' });
    }

    const octokit = new Octokit({ auth: githubToken });
    const user = await octokit.rest.users.getAuthenticated();
    
    res.json({ valid: true, username: user.data.login });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid GitHub token' });
  }
});

module.exports = router;
