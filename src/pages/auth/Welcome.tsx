import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Cloud, Shield, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Welcome() {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

  const handleProviderToggle = (provider: string) => {
    setSelectedProviders(prev => 
      prev.includes(provider) 
        ? prev.filter(p => p !== provider)
        : [...prev, provider]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      completeOnboarding();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-jade-gray flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="flex justify-center mb-8">
          <img 
            src="https://www.jadeglobal.com/themes/custom/jade_subtheme/images/Jade-logo.svg" 
            alt="Jade Global" 
            className="h-12 w-auto"
          />
        </div>

        <div className="bg-white shadow-sm sm:rounded-xl border border-slate-200 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step >= s ? 'bg-jade-blue text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-24 h-1 mx-4 rounded-full ${
                    step > s ? 'bg-jade-blue' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="px-8 py-10">
            {step === 1 && (
              <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mx-auto w-16 h-16 bg-jade-lblue rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">👋</span>
                </div>
                <h2 className="text-3xl font-extrabold text-jade-dark mb-4">
                  Welcome to Jade GovernAI, {user?.name}!
                </h2>
                <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
                  Let's get your platform set up. We'll help you connect your cloud environments so you can start optimizing costs and ensuring compliance immediately.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-8">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <Zap className="w-6 h-6 text-jade-yellow mb-3" />
                    <h3 className="font-semibold text-slate-900 mb-1">Optimize Costs</h3>
                    <p className="text-sm text-slate-600">Identify waste and right-size resources automatically.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <Shield className="w-6 h-6 text-jade-blue mb-3" />
                    <h3 className="font-semibold text-slate-900 mb-1">Ensure Compliance</h3>
                    <p className="text-sm text-slate-600">Continuous monitoring against HIPAA, SOC 2, and CIS.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <Cloud className="w-6 h-6 text-indigo-500 mb-3" />
                    <h3 className="font-semibold text-slate-900 mb-1">Manage IaC</h3>
                    <p className="text-sm text-slate-600">Deploy secure, pre-approved infrastructure blueprints.</p>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-jade-dark mb-2">
                  Connect your cloud providers
                </h2>
                <p className="text-slate-600 mb-8">
                  Select the environments you want Jade GovernAI to monitor and manage. You can always add more later.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { id: 'aws', name: 'Amazon Web Services', icon: '☁️' },
                    { id: 'azure', name: 'Microsoft Azure', icon: '🔷' },
                    { id: 'gcp', name: 'Google Cloud Platform', icon: '🌐' }
                  ].map((provider) => (
                    <div 
                      key={provider.id}
                      onClick={() => handleProviderToggle(provider.id)}
                      className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center text-center ${
                        selectedProviders.includes(provider.id)
                          ? 'border-jade-blue bg-jade-lblue/30'
                          : 'border-slate-200 hover:border-jade-blue/50 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-4xl mb-3">{provider.icon}</span>
                      <h3 className="font-semibold text-slate-900">{provider.name}</h3>
                      {selectedProviders.includes(provider.id) && (
                        <div className="mt-3 w-6 h-6 bg-jade-blue rounded-full flex items-center justify-center text-white">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-jade-dark mb-4">
                  You're all set!
                </h2>
                <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
                  We've configured your workspace. Let's take a quick tour of the dashboard to show you where everything is.
                </p>
                <div className="bg-jade-lblue2 p-6 rounded-xl border border-jade-lblue text-left mb-8">
                  <h4 className="font-semibold text-jade-dark mb-2 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-jade-yellow" />
                    What happens next?
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
                    <li>We'll start scanning your connected environments.</li>
                    <li>Initial cost and compliance insights will appear within 15 minutes.</li>
                    <li>You'll be guided through a brief product tour on your dashboard.</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-slate-200">
              <button
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  step === 1 
                    ? 'text-slate-400 cursor-not-allowed' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={step === 2 && selectedProviders.length === 0}
                className="flex items-center px-6 py-2.5 bg-jade-blue text-white rounded-lg text-sm font-medium hover:bg-jade-blue2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 3 ? 'Go to Dashboard' : 'Continue'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
