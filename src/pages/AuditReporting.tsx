import React, { useState } from 'react';
import { 
  History, 
  Download, 
  Filter, 
  FileText,
  User,
  Clock,
  ChevronDown,
  ChevronUp,
  FileCheck
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
import { useToast } from '../components/Toast';
import Modal from '../components/Modal';

const auditLogs = [
  {
    id: 'AUD-9482',
    action: 'Policy Updated',
    resource: 'S3-Encryption-Policy',
    user: 'admin.user@hls.com',
    timestamp: '2023-10-27 14:32:01 UTC',
    status: 'Success',
    details: 'Updated KMS key requirement for patient data buckets.'
  },
  {
    id: 'AUD-9481',
    action: 'Deployment Blocked',
    resource: 'pr-492-analytics-env',
    user: 'ci-cd-bot',
    timestamp: '2023-10-27 11:15:44 UTC',
    status: 'Blocked',
    details: 'Failed policy: Missing cost-center tag on EC2 instances.'
  },
  {
    id: 'AUD-9480',
    action: 'Exception Granted',
    resource: 'rds-legacy-db',
    user: 'sec-ops-lead@hls.com',
    timestamp: '2023-10-26 09:00:12 UTC',
    status: 'Approved',
    details: 'Temporary exception for unencrypted legacy DB until migration (Expires: 30 days).'
  },
  {
    id: 'AUD-9479',
    action: 'Blueprint Provisioned',
    resource: 'HLS Secure Web App',
    user: 'dev.team.alpha@hls.com',
    timestamp: '2023-10-25 16:45:00 UTC',
    status: 'Success',
    details: 'Provisioned in us-east-1. Cost estimate: $450/mo.'
  }
];

const auditEventsData = [
  { name: 'Policy Changes', count: 45 },
  { name: 'Deployments Blocked', count: 12 },
  { name: 'Exceptions Granted', count: 8 },
  { name: 'Blueprints Provisioned', count: 24 },
  { name: 'Access Revoked', count: 5 },
];

const generatedReports = [
  {
    id: 'REP-1042',
    name: 'Q3 HIPAA Compliance Audit',
    type: 'Detailed Compliance Audit',
    generatedBy: 'admin.user@hls.com',
    date: '2023-10-01 08:00:00 UTC',
    size: '2.4 MB',
    format: 'PDF'
  },
  {
    id: 'REP-1041',
    name: 'September Cost Optimization Summary',
    type: 'Cost Optimization Report',
    generatedBy: 'finance.lead@hls.com',
    date: '2023-09-30 23:59:59 UTC',
    size: '1.1 MB',
    format: 'CSV'
  },
  {
    id: 'REP-1040',
    name: 'Weekly Executive Summary - Week 39',
    type: 'Executive Summary',
    generatedBy: 'System (Automated)',
    date: '2023-09-29 17:00:00 UTC',
    size: '850 KB',
    format: 'PDF'
  }
];

export default function AuditReporting() {
  const { showToast } = useToast();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const exportReport = () => {
    setIsExporting(true);
    showToast('Compiling audit report...', 'info');
    setTimeout(() => {
      setIsExporting(false);
      showToast('Audit report downloaded successfully.', 'success');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Audit & Reporting</h1>
          <p className="text-sm text-slate-500 mt-1">Automated compliance reporting and immutable audit trails.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button 
            onClick={exportReport}
            disabled={isExporting}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export Report'}</span>
            <span className="sm:hidden">{isExporting ? '...' : 'Export'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">Generate Compliance Report</h3>
            <p className="text-sm text-slate-500 mt-1 mb-4">Create detailed, auditor-ready reports for HIPAA, SOC 2, or custom frameworks.</p>
            <button onClick={() => setIsConfigModalOpen(true)} className="text-sm font-medium text-blue-600 hover:text-blue-700">Configure Report &rarr;</button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">Compliance History</h3>
            <p className="text-sm text-slate-500 mt-1 mb-4">View historical compliance posture and remediation trends over time.</p>
            <button onClick={() => showToast('Historical trends are up to date.', 'success')} className="text-sm font-medium text-purple-600 hover:text-purple-700">View Trends &rarr;</button>
          </div>
        </div>
      </div>

      {/* Audit Events Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-slate-900">Audit Events by Category (Last 30 Days)</h3>
          <p className="text-sm text-slate-500 mt-1">
            Distribution of governance and compliance events across the platform.
          </p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={auditEventsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" name="Event Count" fill="#6366f1" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="count" position="top" style={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Generated Compliance Reports</h2>
            <p className="text-sm text-slate-500 mt-1">Auditable records of governance decisions and compliance posture.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">Report Name</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Generated By</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {generatedReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FileCheck className="w-4 h-4 mr-2 text-jade-blue" />
                      <span className="font-medium text-slate-900">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{report.type}</td>
                  <td className="px-6 py-4 text-slate-600">{report.generatedBy}</td>
                  <td className="px-6 py-4 text-slate-500">{report.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => showToast(`Downloading ${report.name}...`, 'info')}
                      className="text-jade-blue hover:text-jade-blue2 font-medium flex items-center justify-end w-full"
                    >
                      <Download className="w-4 h-4 mr-1" /> Download {report.format}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Governance Audit Trail</h2>
          <p className="text-sm text-slate-500 mt-1">Immutable record of all policy changes, exceptions, and provisioning activities.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">Event ID</th>
                <th className="px-6 py-3 font-medium">Action</th>
                <th className="px-6 py-3 font-medium">Resource / Target</th>
                <th className="px-6 py-3 font-medium">User / System</th>
                <th className="px-6 py-3 font-medium">Timestamp</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map((log) => (
                <React.Fragment key={log.id}>
                  <tr 
                    onClick={() => toggleRow(log.id)}
                    className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-slate-500 flex items-center">
                      {expandedRow === log.id ? (
                        <ChevronUp className="w-4 h-4 mr-2 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 mr-2 text-slate-400" />
                      )}
                      {log.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{log.action}</td>
                    <td className="px-6 py-4 text-slate-600">{log.resource}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-slate-600">
                        <User className="w-3 h-3 mr-1.5 text-slate-400" />
                        {log.user}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-slate-500 text-xs">
                        <Clock className="w-3 h-3 mr-1.5" />
                        {log.timestamp}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        log.status === 'Success' || log.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                  {expandedRow === log.id && (
                    <tr className="bg-slate-50/50">
                      <td colSpan={6} className="px-6 py-4 border-t border-slate-100">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <div className="flex-1 w-full">
                            <span className="font-semibold text-slate-700 text-xs uppercase tracking-wider block mb-1">Details</span>
                            <p className="text-sm text-slate-600">{log.details}</p>
                          </div>
                          <div className="flex-1 w-full">
                            <span className="font-semibold text-slate-700 text-xs uppercase tracking-wider block mb-1">Raw JSON</span>
                            <pre className="text-xs font-mono text-slate-500 bg-slate-100 p-2 rounded border border-slate-200 overflow-x-auto max-w-full">
{JSON.stringify({
  eventId: log.id,
  action: log.action,
  target: log.resource,
  actor: log.user,
  timestamp: log.timestamp,
  status: log.status,
  metadata: {
    ip: '192.168.1.45',
    userAgent: 'Mozilla/5.0...'
  }
}, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
          <span>Showing 4 of 1,248 events</span>
          <div className="flex space-x-2">
            <button onClick={() => showToast('Already on the first page', 'info')} className="px-3 py-1 border border-slate-300 rounded hover:bg-white disabled:opacity-50" disabled>Previous</button>
            <button onClick={() => showToast('Loading next page...', 'info')} className="px-3 py-1 border border-slate-300 rounded hover:bg-white bg-white">Next</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filter Audit Logs"
        footer={
          <>
            <button onClick={() => setIsFilterModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={() => { setIsFilterModalOpen(false); showToast('Filters applied.', 'success'); }} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
              Apply Filters
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Action Type</label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
              <option>All Actions</option>
              <option>Policy Updated</option>
              <option>Deployment Blocked</option>
              <option>Exception Granted</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
              <option>All Statuses</option>
              <option>Success</option>
              <option>Blocked</option>
              <option>Approved</option>
            </select>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        title="Configure Compliance Report"
        footer={
          <>
            <button onClick={() => setIsConfigModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={() => { setIsConfigModalOpen(false); showToast('Report configuration saved.', 'success'); }} className="px-4 py-2 text-sm font-medium text-white bg-jade-blue hover:bg-jade-blue2 rounded-lg transition-colors">
              Save Configuration
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Framework</label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-jade-blue focus:border-jade-blue outline-none">
              <option>HIPAA</option>
              <option>SOC 2</option>
              <option>ISO 27001</option>
              <option>CIS Foundations</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Frequency</label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-jade-blue focus:border-jade-blue outline-none">
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Quarterly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Recipients (Comma separated)</label>
            <input type="text" placeholder="compliance@hls.com, ciso@hls.com" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-jade-blue focus:border-jade-blue outline-none" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
