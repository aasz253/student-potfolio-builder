import React, { useState } from 'react';
import axios from 'axios';

const initialFormData = {
  fullName: '',
  professionalTitle: '',
  bio: '',
  profileImage: '',
  socialLinks: { github: '', linkedin: '', twitter: '', blog: '' },
  skills: [],
  projects: [{ name: '', description: '', liveUrl: '', githubUrl: '' }],
  experience: [{ jobTitle: '', company: '', startDate: '', endDate: '', bullets: [''] }],
  education: { degree: '', institution: '', graduationYear: '', details: '' },
  resumeUrl: '',
  brandColor: '#3B82F6',
  themePreference: 'Minimalist',
};

export default function PortfolioForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalSteps = 5;

  const updateField = (path, value) => {
    const keys = path.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      updateField('skills', [...formData.skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    updateField('skills', formData.skills.filter((_, i) => i !== index));
  };

  const addProject = () => {
    updateField('projects', [...formData.projects, { name: '', description: '', liveUrl: '', githubUrl: '' }]);
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    updateField('projects', newProjects);
  };

  const removeProject = (index) => {
    updateField('projects', formData.projects.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    updateField('experience', [...formData.experience, { jobTitle: '', company: '', startDate: '', endDate: '', bullets: [''] }]);
  };

  const updateExperience = (index, field, value) => {
    const newExp = [...formData.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    updateField('experience', newExp);
  };

  const updateExperienceBullet = (expIndex, bulletIndex, value) => {
    const newExp = [...formData.experience];
    const newBullets = [...newExp[expIndex].bullets];
    newBullets[bulletIndex] = value;
    newExp[expIndex] = { ...newExp[expIndex], bullets: newBullets };
    updateField('experience', newExp);
  };

  const addExperienceBullet = (expIndex) => {
    const newExp = [...formData.experience];
    newExp[expIndex] = { ...newExp[expIndex], bullets: [...newExp[expIndex].bullets, ''] };
    updateField('experience', newExp);
  };

  const removeExperience = (index) => {
    updateField('experience', formData.experience.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/portfolio', formData);
      onSubmit(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save portfolio data');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    else handleSubmit();
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4, 5].map(step => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-all ${currentStep >= step ? 'bg-blue-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <p className="text-gray-500 text-sm">Step {currentStep} of {totalSteps}</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {currentStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
              <input
                type="text"
                value={formData.professionalTitle}
                onChange={(e) => updateField('professionalTitle', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Senior Frontend Developer"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => updateField('bio', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about yourself..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
            <input
              type="url"
              value={formData.profileImage}
              onChange={(e) => updateField('profileImage', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800">Social Links</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
              <input
                type="url"
                value={formData.socialLinks.github}
                onChange={(e) => updateField('socialLinks.github', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
              <input
                type="url"
                value={formData.socialLinks.linkedin}
                onChange={(e) => updateField('socialLinks.linkedin', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
              <input
                type="url"
                value={formData.socialLinks.twitter}
                onChange={(e) => updateField('socialLinks.twitter', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://twitter.com/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Personal Blog</label>
              <input
                type="url"
                value={formData.socialLinks.blog}
                onChange={(e) => updateField('socialLinks.blog', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://yourblog.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resume URL (PDF)</label>
            <input
              type="url"
              value={formData.resumeUrl}
              onChange={(e) => updateField('resumeUrl', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/resume.pdf"
            />
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800">Technical Skills</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type a skill and press Enter"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="w-5 h-5 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center hover:bg-blue-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {formData.skills.length === 0 && (
            <p className="text-gray-500 text-sm">Add at least one skill to your portfolio</p>
          )}
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800">Featured Projects</h2>
          {formData.projects.map((project, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">Project {index + 1}</h3>
                {formData.projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Project Name"
                />
                <input
                  type="url"
                  value={project.liveUrl}
                  onChange={(e) => updateProject(index, 'liveUrl', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Live Demo URL"
                />
                <input
                  type="url"
                  value={project.githubUrl}
                  onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="GitHub Repository URL"
                />
              </div>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Project Description"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addProject}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition"
          >
            + Add Another Project
          </button>
        </div>
      )}

      {currentStep === 5 && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800">Experience, Education & Style</h2>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Work Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg mb-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Position {index + 1}</span>
                  {formData.experience.length > 1 && (
                    <button type="button" onClick={() => removeExperience(index)} className="text-red-500">Remove</button>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Job Title"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Company"
                  />
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Start Date (e.g., Jan 2020)"
                  />
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="End Date (or Present)"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Responsibilities (one per line)</label>
                  {exp.bullets.map((bullet, bIndex) => (
                    <input
                      key={bIndex}
                      type="text"
                      value={bullet}
                      onChange={(e) => updateExperienceBullet(index, bIndex, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                      placeholder="Describe your responsibility..."
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addExperienceBullet(index)}
                    className="text-blue-500 text-sm hover:underline"
                  >
                    + Add Responsibility
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              className="text-blue-500 hover:underline"
            >
              + Add Work Experience
            </button>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Education</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                value={formData.education.degree}
                onChange={(e) => updateField('education.degree', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Degree (e.g., B.S. Computer Science)"
              />
              <input
                type="text"
                value={formData.education.institution}
                onChange={(e) => updateField('education.institution', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Institution"
              />
              <input
                type="text"
                value={formData.education.graduationYear}
                onChange={(e) => updateField('education.graduationYear', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Graduation Year"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Portfolio Style</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Primary Brand Color</label>
                <input
                  type="color"
                  value={formData.brandColor}
                  onChange={(e) => updateField('brandColor', e.target.value)}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Theme Preference</label>
                <select
                  value={formData.themePreference}
                  onChange={(e) => updateField('themePreference', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  <option value="Minimalist">Minimalist</option>
                  <option value="Gradient">Gradient</option>
                  <option value="Glassmorphism">Glassmorphism</option>
                  <option value="Neon">Neon</option>
                  <option value="Terminal">Terminal</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-medium ${
            currentStep === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={nextStep}
          disabled={loading}
          className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed btn-primary"
        >
          {loading ? 'Saving...' : currentStep === totalSteps ? 'Generate Templates' : 'Next'}
        </button>
      </div>
    </div>
  );
}
