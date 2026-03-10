import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingDown, 
  Zap, 
  Server, 
  Database,
  ArrowRight,
  CheckCircle2
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
  LabelList
} from 'recharts';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

const recommendations = [
  {
    id: 1,
    title: 'Right-size EC2 Instances',
    description: '14 instances in us-east-1 have CPU utilization < 10% for 30 days.',
    savings: '$1,240/mo',
    effort: 'Low',
    service: 'Compute',
    icon: Server
  },
  {
    id: 2,
    title: 'Delete Unattached EBS Volumes',
    description: 'Found 42 unattached volumes across 3 regions.',
    savings: '$850/mo',
    effort: 'Low',
    service: 'Storage',
    icon: Database
  },
  {
    id: 3,
    title: 'Purchase Reserved Instances',
    description: 'Consistent baseline usage detected for RDS PostgreSQL.',
    savings: '$3,400/mo',
    effort: 'Medium',
    service: 'Database',
    icon: Database
  }
];

const costTrendData = [
  { month: 'Oct', cost: 42000, waste: 8500 },
  { month: 'Nov', cost: 45000, waste: 9200 },
  { month: 'Dec', cost: 48000, waste: 11000 },
  { month: 'Jan', cost: 41000, waste: 5400 },
  { month: 'Feb', cost: 39000, waste: 4200 },
  { month: 'Mar', cost: 38500, waste: 3800 },
];

const resourceUtilizationData = [
  { name: 'Compute', utilized: 68, idle: 32 },
  { name: 'Storage', utilized: 85, idle: 15 },
  { name: 'Database', utilized: 72, idle: 28 },
  { name: 'Network', utilized: 45, idle: 55 },
];

export default function CostManagement() {
  const { showToast } = useToast();
  const [activeRecs, setActiveRecs] = useState(recommendations);
  const [selectedRec, setSelectedRec] = useState<typeof recommendations[0] | null>(null);

  const applyAllSafe = () => {
    const safeRecs = activeRecs.filter(r => r.effort === 'Low');
    if (safeRecs.length > 0) {
      setActiveRecs(prev => prev.filter(r => r.effort !== 'Low'));
      showToast(`Applied ${safeRecs.length} safe recommendations successfully.`, 'success');
    } else {
      showToast('No safe recommendations available to apply.', 'info');
    }
  };

  const applySingle = () => {
    if (selectedRec) {
      setActiveRecs(prev => prev.filter(r => r.id !== selectedRec.id));
      showToast(`Recommendation "${selectedRec.title}" applied successfully.`, 'success');
      setSelectedRec(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cost Management & FinOps</h1>
          <p className="text-sm text-slate-500 mt-1">AI-driven cost optimization and anomaly detection.</p>
        </div>
        <button 
          onClick={applyAllSafe}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center self-start md:self-auto"
        >
          <Zap className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Apply All Safe Recommendations</span>
          <span className="sm:hidden">Apply Safe</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Total Potential Savings</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-bold text-slate-900">$5,490</span>
            <span className="ml-2 text-sm font-medium text-slate-500">/ month</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Identified Anomalies</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-bold text-amber-500">3</span>
            <span className="ml-2 text-sm font-medium text-slate-500">this week</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Optimization Score</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-bold text-emerald-500">78%</span>
            <span className="ml-2 text-sm font-medium text-slate-500">Needs improvement</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost vs Waste Trend */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-slate-900">Cost vs Waste Trend (6 Months)</h3>
            <p className="text-sm text-slate-500 mt-1">
              Tracking total cost vs identified waste over time.
            </p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Area type="monotone" dataKey="cost" name="Total Cost" stroke="#0f172a" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
                <Area type="monotone" dataKey="waste" name="Identified Waste" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorWaste)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resource Utilization vs Idle */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-slate-900">Resource Utilization vs Idle</h3>
            <p className="text-sm text-slate-500 mt-1">
              Percentage of utilized vs idle resources by service category.
            </p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceUtilizationData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} width={80} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${value}%`, undefined]}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Bar dataKey="utilized" name="Utilized (%)" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]}>
                  <LabelList dataKey="utilized" position="inside" formatter={(val: number) => `${val}%`} style={{ fill: '#fff', fontSize: 10, fontWeight: 500 }} />
                </Bar>
                <Bar dataKey="idle" name="Idle (%)" stackId="a" fill="#f43f5e" radius={[0, 4, 4, 0]}>
                  <LabelList dataKey="idle" position="inside" formatter={(val: number) => `${val}%`} style={{ fill: '#fff', fontSize: 10, fontWeight: 500 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">AI Recommendations</h2>
          <p className="text-sm text-slate-500 mt-1">Intelligent cost optimization based on historical usage patterns.</p>
        </div>
        <div className="divide-y divide-slate-100">
          {activeRecs.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400 mb-3" />
              <p className="text-lg font-medium text-slate-900">All Optimized!</p>
              <p>No further cost recommendations at this time.</p>
            </div>
          ) : (
            activeRecs.map((rec) => (
              <div key={rec.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-slate-100 rounded-lg text-slate-600 shrink-0">
                    <rec.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900">{rec.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">{rec.description}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Save {rec.savings}
                      </span>
                      <span className="text-xs text-slate-500">Effort: {rec.effort}</span>
                      <span className="text-xs text-slate-500">Service: {rec.service}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedRec(rec)}
                  className="flex items-center justify-center w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Review <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal
        isOpen={!!selectedRec}
        onClose={() => setSelectedRec(null)}
        title="Review Recommendation"
        footer={
          <>
            <button onClick={() => setSelectedRec(null)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={applySingle} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
              Apply Recommendation
            </button>
          </>
        }
      >
        {selectedRec && (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-between">
              <span className="text-sm font-medium text-emerald-800">Estimated Monthly Savings</span>
              <span className="text-xl font-bold text-emerald-600">{selectedRec.savings}</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">Impact Analysis</h4>
              <p className="text-sm text-slate-600">
                Applying this recommendation will automatically modify infrastructure via Terraform. 
                Based on historical metrics, there is a &lt;1% chance of performance impact.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">Resources Affected</h4>
              <ul className="list-disc list-inside text-sm text-slate-600">
                <li>{selectedRec.description}</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
