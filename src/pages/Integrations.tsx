import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cloud, 
  Server, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  Plus,
  Network
} from 'lucide-react';
import { useToast } from '../components/Toast';

interface CloudProvider {
  id: string;
  name: string;
  type: 'Public' | 'Private' | 'Hybrid';
  status: 'connected' | 'disconnected' | 'connecting';
  icon: React.ElementType;
  color: string;
  resources: number;
}

const initialProviders: CloudProvider[] = [
  { id: 'aws', name: 'Amazon Web Services (AWS)', type: 'Public', status: 'connected', icon: Cloud, color: 'text-orange-500', resources: 1240 },
  { id: 'gcp', name: 'Google Cloud Platform (GCP)', type: 'Public', status: 'connected', icon: Cloud, color: 'text-blue-500', resources: 856 },
  { id: 'azure', name: 'Microsoft Azure', type: 'Public', status: 'disconnected', icon: Cloud, color: 'text-blue-600', resources: 0 },
  { id: 'oci', name: 'Oracle Cloud Infrastructure (OCI)', type: 'Public', status: 'disconnected', icon: Database, color: 'text-red-500', resources: 0 },
  { id: 'vultr', name: 'Vultr', type: 'Public', status: 'disconnected', icon: Server, color: 'text-indigo-500', resources: 0 },
  { id: 'linode', name: 'Linode', type: 'Public', status: 'disconnected', icon: Server, color: 'text-green-500', resources: 0 },
  { id: 'private-dc', name: 'On-Premises Datacenter', type: 'Private', status: 'connected', icon: Network, color: 'text-slate-600', resources: 450 },
  { id: 'custom-private', name: 'Custom Private Cloud', type: 'Private', status: 'disconnected', icon: ShieldCheck, color: 'text-emerald-600', resources: 0 },
];

export default function Integrations() {
  const [providers, setProviders] = useState<CloudProvider[]>(initialProviders);
  const { showToast } = useToast();

  const handleConnect = (id: string) => {
    // Set to connecting
    setProviders(prev => prev.map(p => p.id === id ? { ...p, status: 'connecting' } : p));
    
    // Simulate connection delay
    setTimeout(() => {
      setProviders(prev => prev.map(p => {
        if (p.id === id) {
          showToast(`Successfully connected to ${p.name}`, 'success');
          return { ...p, status: 'connected', resources: Math.floor(Math.random() * 500) + 50 };
        }
        return p;
      }));
    }, 2000);
  };

  const handleDisconnect = (id: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === id) {
        showToast(`Disconnected from ${p.name}`, 'info');
        return { ...p, status: 'disconnected', resources: 0 };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Cloud Integrations</h1>
        <p className="text-slate-500 mt-1">Connect and manage your multi-cloud and hybrid environments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg bg-slate-50 border border-slate-100 ${provider.color}`}>
                  <provider.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{provider.name}</h3>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    {provider.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Status</span>
                {provider.status === 'connected' ? (
                  <span className="flex items-center text-emerald-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Connected
                  </span>
                ) : provider.status === 'connecting' ? (
                  <span className="flex items-center text-blue-600 font-medium">
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    Connecting...
                  </span>
                ) : (
                  <span className="text-slate-400 font-medium">Disconnected</span>
                )}
              </div>

              {provider.status === 'connected' && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Active Resources</span>
                  <span className="font-semibold text-slate-900">{provider.resources.toLocaleString()}</span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100">
                {provider.status === 'connected' ? (
                  <button
                    onClick={() => handleDisconnect(provider.id)}
                    className="w-full py-2 px-4 rounded-lg border border-rose-200 text-rose-600 font-medium text-sm hover:bg-rose-50 transition-colors"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={() => handleConnect(provider.id)}
                    disabled={provider.status === 'connecting'}
                    className="w-full py-2 px-4 rounded-lg bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {provider.status === 'connecting' ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Connect Account
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
