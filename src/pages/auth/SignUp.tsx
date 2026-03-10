import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2 } from 'lucide-react';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUp(name, email);
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-jade-gray flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img 
            src="https://www.jadeglobal.com/themes/custom/jade_subtheme/images/Jade-logo.svg" 
            alt="Jade Global" 
            className="h-12 w-auto"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-jade-dark">
          Start your free trial
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-jade-blue hover:text-jade-blue2">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl sm:px-10 border border-slate-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Full name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-jade-blue focus:border-jade-blue sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Work email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-jade-blue focus:border-jade-blue sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-jade-blue focus:border-jade-blue sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-jade-blue focus:ring-jade-blue border-slate-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-slate-900">
                I agree to the{' '}
                <a href="#" className="font-medium text-jade-blue hover:text-jade-blue2">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-jade-blue hover:text-jade-blue2">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-jade-blue hover:bg-jade-blue2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jade-blue transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-slate-900 mb-4">What's included in your trial:</h3>
            <ul className="space-y-3">
              {[
                'Full access to Cloud Cost Optimization',
                'Automated Compliance Scanning',
                'Infrastructure-as-Code Blueprints',
                '14 days of historical data analysis'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-jade-yellow flex-shrink-0" />
                  <span className="ml-2 text-sm text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
