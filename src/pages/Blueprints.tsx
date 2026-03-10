import React, { useState } from 'react';
import { 
  FileCode2, 
  CheckCircle2, 
  GitBranch, 
  Play,
  ShieldCheck,
  Server
} from 'lucide-react';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

const blueprints = [
  {
    id: 1,
    name: 'HLS Secure Web App',
    description: 'HIPAA-compliant 3-tier architecture with WAF, encrypted RDS, and private subnets.',
    provider: 'AWS',
    status: 'Approved',
    version: 'v2.4.1',
    lastUpdated: '2 days ago'
  },
  {
    id: 2,
    name: 'Data Lake Foundation',
    description: 'Secure storage foundation with automated lifecycle policies and strict IAM roles.',
    provider: 'GCP',
    status: 'Approved',
    version: 'v1.1.0',
    lastUpdated: '1 week ago'
  },
  {
    id: 3,
    name: 'Analytics Workspace',
    description: 'Pre-configured JupyterHub environment with cost-control auto-shutdown policies.',
    provider: 'Azure',
    status: 'Pending Review',
    version: 'v1.0.0',
    lastUpdated: '4 hours ago'
  }
];

export default function Blueprints() {
  const { showToast } = useToast();
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [selectedBlueprint, setSelectedBlueprint] = useState<typeof blueprints[0] | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [codeViewerBlueprint, setCodeViewerBlueprint] = useState<typeof blueprints[0] | null>(null);

  const filteredBlueprints = blueprints.filter(bp => 
    bp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    bp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bp.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeployClick = (bp: typeof blueprints[0]) => {
    setSelectedBlueprint(bp);
    setIsDeployModalOpen(true);
  };

  const confirmDeploy = () => {
    setIsDeploying(true);
    showToast(`Initiating deployment for ${selectedBlueprint?.name}...`, 'info');
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployModalOpen(false);
      showToast(`${selectedBlueprint?.name} deployed successfully!`, 'success');
      setSelectedBlueprint(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">IaC & Blueprints</h1>
          <p className="text-sm text-slate-500 mt-1">Self-service, pre-approved infrastructure templates with embedded Policy-as-Code.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center self-start md:self-auto"
        >
          <FileCode2 className="w-4 h-4 mr-2" />
          Create Blueprint
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Active Policies</h3>
            <p className="text-2xl font-bold text-slate-900">248</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">CI/CD Integrations</h3>
            <p className="text-2xl font-bold text-slate-900">12</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-slate-100 text-slate-600 rounded-lg">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Approved Blueprints</h3>
            <p className="text-2xl font-bold text-slate-900">45</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900">Infrastructure Catalog</h2>
          <div className="flex w-full sm:w-auto">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blueprints..." 
              className="w-full sm:w-auto text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredBlueprints.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500">
              <p>No blueprints found matching "{searchQuery}"</p>
            </div>
          ) : (
            filteredBlueprints.map((bp) => (
              <div key={bp.id} className="border border-slate-200 rounded-xl p-5 hover:border-emerald-500 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                    {bp.provider}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    bp.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {bp.status === 'Approved' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {bp.status}
                  </span>
                </div>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{bp.name}</h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{bp.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100">
                <span>{bp.version}</span>
                <span>Updated {bp.lastUpdated}</span>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDeployClick(bp); }}
                  className="flex-1 bg-emerald-50 text-emerald-700 py-2 rounded-lg text-sm font-medium hover:bg-emerald-100 flex items-center justify-center"
                >
                  <Play className="w-4 h-4 mr-2" /> Deploy
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setCodeViewerBlueprint(bp); }}
                  className="flex-1 border border-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-50"
                >
                  View Code
                </button>
              </div>
            </div>
          )))}
        </div>
      </div>

      <Modal
        isOpen={isDeployModalOpen}
        onClose={() => !isDeploying && setIsDeployModalOpen(false)}
        title="Deploy Infrastructure Blueprint"
        footer={
          <>
            <button 
              onClick={() => setIsDeployModalOpen(false)} 
              disabled={isDeploying}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={confirmDeploy} 
              disabled={isDeploying}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors disabled:opacity-50 flex items-center"
            >
              {isDeploying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Deploying...
                </>
              ) : (
                'Confirm Deployment'
              )}
            </button>
          </>
        }
      >
        {selectedBlueprint && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="text-sm font-semibold text-slate-900">{selectedBlueprint.name}</h4>
              <p className="text-sm text-slate-500 mt-1">{selectedBlueprint.description}</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Environment</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" disabled={isDeploying}>
                  <option>Development</option>
                  <option>Staging</option>
                  <option>Production</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Region</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" disabled={isDeploying}>
                  <option>us-east-1 (N. Virginia)</option>
                  <option>us-west-2 (Oregon)</option>
                  <option>eu-west-1 (Ireland)</option>
                </select>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm flex items-start">
              <ShieldCheck className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
              <p>This deployment will be automatically evaluated against your active compliance policies before provisioning begins.</p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Blueprint"
        footer={
          <>
            <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={() => { setIsCreateModalOpen(false); showToast('Blueprint created and sent for review.', 'success'); }} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
              Create Blueprint
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Blueprint Name</label>
            <input type="text" placeholder="e.g., Secure EKS Cluster" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cloud Provider</label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
              <option>AWS</option>
              <option>GCP</option>
              <option>Azure</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Terraform Repository URL</label>
            <input type="text" placeholder="https://github.com/org/repo" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!codeViewerBlueprint}
        onClose={() => setCodeViewerBlueprint(null)}
        title={`View Code: ${codeViewerBlueprint?.name}`}
        footer={
          <button onClick={() => setCodeViewerBlueprint(null)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors">
            Close
          </button>
        }
      >
        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-xs text-emerald-400 font-mono">
{`resource "aws_s3_bucket" "secure_bucket" {
  bucket = "hls-secure-data-\${var.environment}"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "secure_bucket_crypto" {
  bucket = aws_s3_bucket.secure_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.mykey.arn
      sse_algorithm     = "aws:kms"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "secure_bucket_access" {
  bucket = aws_s3_bucket.secure_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`}
          </pre>
        </div>
      </Modal>
    </div>
  );
}
