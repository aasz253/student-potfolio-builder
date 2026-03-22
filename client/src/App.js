import React, { useState } from 'react';
import PortfolioForm from './components/PortfolioForm';
import TemplateGallery from './components/TemplateGallery';
import DeploymentPanel from './components/DeploymentPanel';
import SuccessScreen from './components/SuccessScreen';

function App() {
  const [step, setStep] = useState(1);
  const [portfolioData, setPortfolioData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [deploymentResult, setDeploymentResult] = useState(null);

  const handleFormSubmit = (data) => {
    setPortfolioData(data);
    setStep(2);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setStep(3);
  };

  const handleDeploy = async (githubToken, repoName) => {
    try {
      const response = await fetch('http://localhost:5000/api/github/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portfolioData: portfolioData,
          githubToken,
          repoName,
          templateType: selectedTemplate,
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Deployment failed');
      }

      setDeploymentResult(result);
      setStep(4);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const resetFlow = () => {
    setStep(1);
    setPortfolioData(null);
    setSelectedTemplate(null);
    setDeploymentResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <header className="py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-white">AutoPortfolio Builder</h1>
          <p className="text-purple-200 text-sm mt-1">Create your professional developer portfolio in minutes</p>
        </div>
      </header>

      <main className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          {step < 4 && (
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step >= s
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/20 text-white/60'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`w-12 h-0.5 ${step > s ? 'bg-blue-500' : 'bg-white/20'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {step === 1 && (
            <PortfolioForm onSubmit={handleFormSubmit} />
          )}

          {step === 2 && (
            <TemplateGallery
              portfolioData={portfolioData}
              onSelect={handleTemplateSelect}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <DeploymentPanel
              portfolioData={portfolioData}
              selectedTemplate={selectedTemplate}
              onDeploy={handleDeploy}
              onBack={() => setStep(2)}
            />
          )}

          {step === 4 && deploymentResult && (
            <SuccessScreen
              result={deploymentResult}
              onCreateNew={resetFlow}
            />
          )}
        </div>
      </main>

      <footer className="py-6 text-center text-white/50 text-sm">
        Built with React & Node.js
      </footer>
    </div>
  );
}

export default App;
