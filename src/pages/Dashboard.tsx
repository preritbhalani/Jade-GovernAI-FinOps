import React, { useState } from 'react';
import { 
  ShieldAlert, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2,
  ArrowRight,
  Activity,
  DollarSign,
  BellRing,
  Settings2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Label,
  ReferenceLine,
  LabelList
} from 'recharts';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

const complianceData = [
  { name: 'Mon', score: 82 },
  { name: 'Tue', score: 84 },
  { name: 'Wed', score: 81 },
  { name: 'Thu', score: 86 },
  { name: 'Fri', score: 89 },
  { name: 'Sat', score: 92 },
  { name: 'Sun', score: 94 },
];

const costData = [
  { name: 'AWS', optimized: 45000, waste: 12000 },
  { name: 'Azure', optimized: 32000, waste: 8000 },
  { name: 'GCP', optimized: 28000, waste: 5000 },
];

const alerts = [
  {
    id: 1,
    type: 'security',
    severity: 'critical',
    message: 'Unencrypted S3 bucket detected in production account (HLS-Prod-Data).',
    time: '10 mins ago',
    action: 'Enforce Encryption',
    team: 'Security',
  },
  {
    id: 2,
    type: 'cost',
    severity: 'high',
    message: 'Idle RDS instance (db-analytics-dev) costing $450/mo detected.',
    time: '1 hour ago',
    action: 'Terminate Instance',
    team: 'Finance',
  },
  {
    id: 3,
    type: 'compliance',
    severity: 'high',
    message: 'HIPAA violation: PHI data accessible without MFA in us-east-1.',
    time: '2 hours ago',
    action: 'Review Access',
    team: 'IT',
  },
  {
    id: 4,
    type: 'policy',
    severity: 'medium',
    message: 'Non-compliant IaC deployment blocked in CI/CD pipeline (missing tags).',
    time: '4 hours ago',
    action: 'View Logs',
    team: 'DevOps',
  },
];

export default function Dashboard() {
  const { showToast } = useToast();
  const [activeAlerts, setActiveAlerts] = useState(alerts);
  const [selectedAlert, setSelectedAlert] = useState<typeof alerts[0] | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAlertConfigOpen, setIsAlertConfigOpen] = useState(false);

  const handleAction = (alert: typeof alerts[0]) => {
    setSelectedAlert(alert);
  };

  const confirmAction = () => {
    if (selectedAlert) {
      setActiveAlerts(prev => prev.filter(a => a.id !== selectedAlert.id));
      showToast(`Action "${selectedAlert.action}" executed successfully.`, 'success');
      setSelectedAlert(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Real-time Governance Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">AI-driven insights across security, cost, and compliance.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1.5 rounded-full">
            <Activity className="w-4 h-4 mr-2 animate-pulse" />
            System Healthy
          </span>
          <button 
            onClick={() => setIsAlertConfigOpen(true)}
            className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center"
          >
            <Settings2 className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Configure Alerts</span>
            <span className="sm:hidden">Alerts</span>
          </button>
          <button 
            onClick={() => setIsReportModalOpen(true)}
            className="bg-jade-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-jade-blue2 transition-colors"
          >
            <span className="hidden sm:inline">Generate Report</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">Compliance Score</h3>
            <ShieldAlert className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-3xl font-bold text-slate-900">94%</span>
            <span className="ml-2 text-sm font-medium text-emerald-600 flex items-center">
              +2.4% <TrendingDown className="w-3 h-3 ml-1 rotate-180" />
            </span>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '94%' }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">Cloud Waste Detected</h3>
            <DollarSign className="w-5 h-5 text-rose-500" />
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-3xl font-bold text-slate-900">$25.0K</span>
            <span className="ml-2 text-sm font-medium text-rose-600 flex items-center">
              +5.1% <TrendingDown className="w-3 h-3 ml-1 rotate-180" />
            </span>
          </div>
          <p className="mt-4 text-xs text-slate-500">Across 3 cloud providers</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">Active Violations</h3>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-3xl font-bold text-slate-900">12</span>
            <span className="ml-2 text-sm font-medium text-emerald-600 flex items-center">
              -4 <TrendingDown className="w-3 h-3 ml-1" />
            </span>
          </div>
          <p className="mt-4 text-xs text-slate-500">3 Critical, 9 High</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">Prevented Deployments</h3>
            <CheckCircle2 className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-3xl font-bold text-slate-900">148</span>
            <span className="ml-2 text-sm font-medium text-slate-500">this week</span>
          </div>
          <p className="mt-4 text-xs text-slate-500">Blocked by Policy-as-Code</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="mb-6">
              <h3 className="text-base font-semibold text-slate-900">Compliance Posture Trend</h3>
              <p className="text-sm text-slate-500 mt-1">
                Tracking overall security score <strong className="text-slate-700 font-medium">(Vertical Axis)</strong> over the last 7 days <strong className="text-slate-700 font-medium">(Horizontal Axis)</strong>.
              </p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={complianceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={15}>
                    <Label value="Timeline (Days)" offset={-15} position="insideBottom" style={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                  </XAxis>
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[60, 100]} tickFormatter={(value) => `${value}%`}>
                    <Label value="Compliance Score (%)" angle={-90} position="insideLeft" offset={-10} style={{ textAnchor: 'middle', fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                  </YAxis>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`${value}%`, 'Score']}
                    labelStyle={{ color: '#64748b', marginBottom: '4px', fontWeight: 600 }}
                  />
                  <ReferenceLine y={90} stroke="#f59e0b" strokeDasharray="3 3">
                    <Label value="Target (90%)" position="top" fill="#f59e0b" fontSize={12} fontWeight={500} />
                  </ReferenceLine>
                  <Area type="monotone" dataKey="score" name="Score" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="mb-6">
              <h3 className="text-base font-semibold text-slate-900">Cost vs Waste by Provider</h3>
              <p className="text-sm text-slate-500 mt-1">
                Comparing Optimized Spend vs Identified Waste <strong className="text-slate-700 font-medium">(Vertical Axis)</strong> across Cloud Providers <strong className="text-slate-700 font-medium">(Horizontal Axis)</strong>.
              </p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={15}>
                    <Label value="Cloud Providers" offset={-15} position="insideBottom" style={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                  </XAxis>
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`}>
                    <Label value="Cost / Waste ($)" angle={-90} position="insideLeft" offset={-10} style={{ textAnchor: 'middle', fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                  </YAxis>
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                  <Bar dataKey="optimized" name="Optimized Spend" fill="#0f172a" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="optimized" position="top" formatter={(val: number) => `$${val/1000}k`} style={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} />
                  </Bar>
                  <Bar dataKey="waste" name="Identified Waste" fill="#f43f5e" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="waste" position="top" formatter={(val: number) => `$${val/1000}k`} style={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Alerts Feed */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Active Alerts</h3>
            <button onClick={() => window.location.href = '/compliance'} className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {activeAlerts.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400 mb-3" />
                <p>All alerts resolved!</p>
              </div>
            ) : (
              activeAlerts.map((alert) => (
                <div key={alert.id} className="p-4 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 last:border-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="flex items-start space-x-3">
                      <div className={`mt-0.5 p-2 rounded-full shrink-0 ${
                        alert.severity === 'critical' ? 'bg-rose-100 text-rose-600' :
                        alert.severity === 'high' ? 'bg-amber-100 text-amber-600' :
                        'bg-indigo-100 text-indigo-600'
                      }`}>
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            {alert.type}
                          </span>
                          <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                          <span className="text-xs text-slate-400">{alert.time}</span>
                          <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                          <span className="text-xs font-medium text-jade-blue bg-jade-lblue px-2 py-0.5 rounded-full">
                            {alert.team} Team
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-900 mt-1 leading-snug">
                          {alert.message}
                        </p>
                        <button 
                          onClick={() => handleAction(alert)}
                          className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                        >
                          {alert.action} &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Modal 
        isOpen={!!selectedAlert} 
        onClose={() => setSelectedAlert(null)}
        title="Confirm Action"
        footer={
          <>
            <button onClick={() => setSelectedAlert(null)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={confirmAction} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
              Execute Action
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Are you sure you want to execute the following action?</p>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="font-medium text-slate-900">{selectedAlert?.action}</p>
            <p className="text-sm text-slate-500 mt-1">For alert: {selectedAlert?.message}</p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="Generate Executive Report"
        footer={
          <>
            <button onClick={() => setIsReportModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button 
              onClick={() => {
                setIsReportModalOpen(false);
                showToast('Executive report generation started. You will be notified when it is ready.', 'success');
              }} 
              className="px-4 py-2 text-sm font-medium text-white bg-jade-blue hover:bg-jade-blue2 rounded-lg transition-colors"
            >
              Generate
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Report Type</label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-jade-blue focus:border-jade-blue outline-none">
              <option>Executive Summary</option>
              <option>Detailed Compliance Audit</option>
              <option>Cost Optimization Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time Range</label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-jade-blue focus:border-jade-blue outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Quarter</option>
            </select>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isAlertConfigOpen}
        onClose={() => setIsAlertConfigOpen(false)}
        title="Customizable Alerts & Notifications"
        footer={
          <>
            <button onClick={() => setIsAlertConfigOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button 
              onClick={() => {
                setIsAlertConfigOpen(false);
                showToast('Alert preferences saved successfully.', 'success');
              }} 
              className="px-4 py-2 text-sm font-medium text-white bg-jade-blue hover:bg-jade-blue2 rounded-lg transition-colors"
            >
              Save Preferences
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <p className="text-sm text-slate-600">Configure real-time alerts for security, cost, and compliance violations to route to the appropriate teams.</p>
          
          <div className="space-y-4">
            <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-900 flex items-center"><ShieldAlert className="w-4 h-4 mr-2 text-rose-500" /> Security & Compliance</h4>
                <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">IT & Security Teams</span>
              </div>
              <div className="space-y-2 mt-3">
                <label className="flex items-center text-sm text-slate-700">
                  <input type="checkbox" defaultChecked className="mr-2 rounded text-jade-blue focus:ring-jade-blue" />
                  Notify on Critical HIPAA/SOC2 Violations
                </label>
                <label className="flex items-center text-sm text-slate-700">
                  <input type="checkbox" defaultChecked className="mr-2 rounded text-jade-blue focus:ring-jade-blue" />
                  Notify on Unencrypted Data Storage
                </label>
                <label className="flex items-center text-sm text-slate-700">
                  <input type="checkbox" defaultChecked className="mr-2 rounded text-jade-blue focus:ring-jade-blue" />
                  Notify on Unauthorized IAM Role Changes
                </label>
              </div>
            </div>

            <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-900 flex items-center"><DollarSign className="w-4 h-4 mr-2 text-emerald-500" /> Cost Anomalies</h4>
                <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">Finance Team</span>
              </div>
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-slate-700">
                    <input type="checkbox" defaultChecked className="mr-2 rounded text-jade-blue focus:ring-jade-blue" />
                    Notify when daily spend exceeds:
                  </label>
                  <input type="number" defaultValue={1000} className="w-24 px-2 py-1 text-sm border border-slate-300 rounded focus:ring-jade-blue focus:border-jade-blue" />
                </div>
                <label className="flex items-center text-sm text-slate-700">
                  <input type="checkbox" defaultChecked className="mr-2 rounded text-jade-blue focus:ring-jade-blue" />
                  Notify on Idle Resources {'>'} 7 days
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Notification Channels</label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-jade-blue focus:border-jade-blue outline-none">
                <option>Email & In-App Dashboard</option>
                <option>Slack / Microsoft Teams</option>
                <option>PagerDuty (Critical Only)</option>
                <option>All Channels</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
