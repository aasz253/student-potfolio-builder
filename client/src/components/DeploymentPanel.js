import React, { useState } from 'react';
import axios from 'axios';

export default function DeploymentPanel({ portfolioData, selectedTemplate, onDeploy, onBack }) {
  const [githubToken, setGithubToken] = useState('');
  const [repoName, setRepoName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tokenValid, setTokenValid] = useState(null);
  const [username, setUsername] = useState('');

  const verifyToken = async () => {
    if (!githubToken) {
      setError('Please enter your GitHub token');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/github/verify-token', {
        githubToken,
      });
      setTokenValid(true);
      setUsername(response.data.username);
    } catch (err) {
      setTokenValid(false);
      setError(err.response?.data?.error || 'Invalid GitHub token');
    } finally {
      setLoading(false);
    }
  };

  const handleDeploy = async () => {
    if (!githubToken || !repoName) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^[a-zA-Z0-9-_]+$/.test(repoName)) {
      setError('Repository name can only contain letters, numbers, hyphens, and underscores');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onDeploy(githubToken, repoName);
    } catch (err) {
      setError(err.message || 'Deployment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const templateNames = {
    Terminal: 'The Terminal',
    Glassmorphism: 'Glassmorphism',
    Sidebar: 'The Sidebar',
    Gradient: 'The Gradient',
    Minimalist: 'Minimalist',
  };

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/80 hover:text-white transition mb-6"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Templates
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Deploy to GitHub</h2>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Selected Template</h3>
            <p className="text-blue-600">{templateNames[selectedTemplate] || selectedTemplate}</p>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Portfolio Summary</h3>
            <p className="text-gray-600"><strong>Name:</strong> {portfolioData?.fullName}</p>
            <p className="text-gray-600"><strong>Title:</strong> {portfolioData?.professionalTitle || 'Not specified'}</p>
            <p className="text-gray-600"><strong>Skills:</strong> {(portfolioData?.skills || []).length} skills</p>
            <p className="text-gray-600"><strong>Projects:</strong> {(portfolioData?.projects || []).length} projects</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Personal Access Token
              </label>
              <div className="flex gap-3">
                <input
                  type="password"
                  value={githubToken}
                  onChange={(e) => {
                    setGithubToken(e.target.value);
                    setTokenValid(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ghp_xxxxxxxxxxxx"
                />
                <button
                  onClick={verifyToken}
                  disabled={loading || !githubToken}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition"
                >
                  Verify
                </button>
              </div>
              {tokenValid === true && (
                <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Connected as {username}
                </p>
              )}
              {tokenValid === false && (
                <p className="mt-2 text-sm text-red-600">Invalid token. Please check and try again.</p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Need a token? Go to GitHub Settings {'->'} Developer settings {'->'} Personal access tokens {'->'} Generate new token (needs 'repo' scope)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repository Name
              </label>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="my-portfolio"
              />
              <p className="mt-2 text-xs text-gray-500">
                This will create a public repository: github.com/{username || 'username'}/{repoName || 'repo-name'}
              </p>
            </div>

            <button
              onClick={handleDeploy}
              disabled={loading || !githubToken || !repoName || tokenValid !== true}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition btn-primary"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Deploying...
                </span>
              ) : (
                'Deploy Portfolio'
              )}
            </button>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">What happens next?</h3>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">1</span>
              <div>
                <p className="font-medium text-gray-800">Create Repository</p>
                <p className="text-gray-500 text-sm">A new public GitHub repository will be created with your chosen name</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">2</span>
              <div>
                <p className="font-medium text-gray-800">Generate Files</p>
                <p className="text-gray-500 text-sm">Your portfolio HTML, CSS, and JS files will be generated and committed</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">3</span>
              <div>
                <p className="font-medium text-gray-800">Enable GitHub Pages</p>
                <p className="text-gray-500 text-sm">Your site will be deployed and available at yourusername.github.io/repo-name</p>
              </div>
            </li>
          </ol>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Note:</strong> Your portfolio is completely self-contained and will work forever, even if this builder goes offline. It contains all your data embedded in the HTML.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
