import React, { useState } from 'react';
import { 
  Shield, 
  AlertOctagon, 
  CheckCircle, 
  Lock,
  FileText
} from 'lucide-react';
import { 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  LabelList
} from 'recharts';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

const frameworks = [
  { name: 'HIPAA', score: 92, status: 'compliant' },
  { name: 'SOC 2', score: 88, status: 'warning' },
  { name: 'ISO 27001', score: 95, status: 'compliant' },
  { name: 'CIS AWS Foundations', score: 76, status: 'critical' },
];

const complianceMetricsData = [
  { name: 'HIPAA', compliant: 145, nonCompliant: 12 },
  { name: 'SOC 2', compliant: 210, nonCompliant: 28 },
  { name: 'ISO 27001', compliant: 180, nonCompliant: 9 },
  { name: 'CIS', compliant: 320, nonCompliant: 101 },
];

const violations = [
  {
    id: 1,
    resource: 'arn:aws:s3:::hls-patient-records-prod',
    policy: 'S3 buckets must have server-side encryption enabled',
    framework: 'HIPAA',
    severity: 'Critical',
    status: 'Open',
    age: '2 hours'
  },
  {
    id: 2,
    resource: 'sg-0a1b2c3d4e5f6g7h8',
    policy: 'Security groups should not allow unrestricted ingress to port 22',
    framework: 'CIS',
    severity: 'High',
    status: 'Open',
    age: '1 day'
  },
  {
    id: 3,
    resource: 'rds-cluster-analytics',
    policy: 'RDS instances should have multi-AZ enabled for high availability',
    framework: 'SOC 2',
    severity: 'Medium',
    status: 'In Progress',
    age: '3 days'
  }
];

export default function Compliance() {
  const { showToast } = useToast();
  const [activeViolations, setActiveViolations] = useState(violations);
  const [selectedViolation, setSelectedViolation] = useState<typeof violations[0] | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [severityFilter, setSeverityFilter] = useState('All Severities');

  const filteredViolations = activeViolations.filter(v => 
    severityFilter === 'All Severities' ? true : v.severity === severityFilter
  );

  const runScan = () => {
    setIsScanning(true);
    showToast('Initiating compliance scan across all environments...', 'info');
    setTimeout(() => {
      setIsScanning(false);
      showToast('Scan complete. No new violations found.', 'success');
    }, 2500);
  };

  const remediate = () => {
    if (selectedViolation) {
      setActiveViolations(prev => prev.filter(v => v.id !== selectedViolation.id));
      showToast(`Violation remediated for ${selectedViolation.resource}`, 'success');
      setSelectedViolation(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Security & Compliance</h1>
          <p className="text-sm text-slate-500 mt-1">Continuous monitoring across cloud and on-prem environments.</p>
        </div>
        <button 
          onClick={runScan}
          disabled={isScanning}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 self-start md:self-auto"
        >
          {isScanning ? 'Scanning...' : 'Run Compliance Scan'}
        </button>
      </div>

      {/* Frameworks Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {frameworks.map((fw) => (
          <div key={fw.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-700">{fw.name}</h3>
              {fw.status === 'compliant' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
              {fw.status === 'warning' && <AlertOctagon className="w-5 h-5 text-amber-500" />}
              {fw.status === 'critical' && <AlertOctagon className="w-5 h-5 text-rose-500" />}
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-bold text-slate-900">{fw.score}%</span>
            </div>
            <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${
                  fw.status === 'compliant' ? 'bg-emerald-500' :
                  fw.status === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
                }`} 
                style={{ width: `${fw.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance vs Non-Compliance Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-slate-900">Compliance vs Non-Compliance by Framework</h3>
          <p className="text-sm text-slate-500 mt-1">
            Number of compliant vs non-compliant resources across major security frameworks.
          </p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={complianceMetricsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              <Bar dataKey="compliant" name="Compliant Resources" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]}>
                <LabelList dataKey="compliant" position="inside" style={{ fill: '#fff', fontSize: 10, fontWeight: 500 }} />
              </Bar>
              <Bar dataKey="nonCompliant" name="Non-Compliant Resources" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="nonCompliant" position="inside" style={{ fill: '#fff', fontSize: 10, fontWeight: 500 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Violations Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Active Violations</h2>
            <p className="text-sm text-slate-500 mt-1">Resources failing policy checks.</p>
          </div>
          <div className="flex w-full sm:w-auto">
            <select 
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full sm:w-auto text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option>All Severities</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">Resource</th>
                <th className="px-6 py-3 font-medium">Policy Violation</th>
                <th className="px-6 py-3 font-medium">Framework</th>
                <th className="px-6 py-3 font-medium">Severity</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Age</th>
                <th className="px-6 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredViolations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <CheckCircle className="w-12 h-12 mx-auto text-emerald-400 mb-3" />
                    <p className="text-lg font-medium text-slate-900">100% Compliant</p>
                    <p>No active violations found for this filter.</p>
                  </td>
                </tr>
              ) : (
                filteredViolations.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-mono text-xs text-slate-600">{v.resource}</td>
                    <td className="px-6 py-4 text-slate-900">{v.policy}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                        {v.framework}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        v.severity === 'Critical' ? 'bg-rose-100 text-rose-700' :
                        v.severity === 'High' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {v.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{v.status}</td>
                    <td className="px-6 py-4 text-slate-500">{v.age}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedViolation(v)}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                      >
                        Remediate
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={!!selectedViolation}
        onClose={() => setSelectedViolation(null)}
        title="Remediate Violation"
        footer={
          <>
            <button onClick={() => setSelectedViolation(null)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={remediate} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
              Execute Remediation
            </button>
          </>
        }
      >
        {selectedViolation && (
          <div className="space-y-4">
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg">
              <h4 className="text-sm font-semibold text-rose-900 mb-1">Violation Details</h4>
              <p className="text-sm text-rose-700">{selectedViolation.policy}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">Target Resource</h4>
              <p className="text-sm font-mono text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                {selectedViolation.resource}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">Proposed Action</h4>
              <p className="text-sm text-slate-600">
                Jade GovernAI will automatically apply the required configuration changes via the cloud provider's API to bring this resource back into compliance with {selectedViolation.framework}.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
