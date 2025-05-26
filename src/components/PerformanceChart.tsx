
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface PerformanceChartProps {
  timeRange: string;
  selectedAgent: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ timeRange, selectedAgent }) => {
  const performanceData = [
    { date: '2024-01-01', responseTime: 1.2, qualityScore: 8.5, throughput: 450, errorRate: 0.5 },
    { date: '2024-01-02', responseTime: 1.1, qualityScore: 8.7, throughput: 520, errorRate: 0.3 },
    { date: '2024-01-03', responseTime: 1.3, qualityScore: 8.6, throughput: 480, errorRate: 0.4 },
    { date: '2024-01-04', responseTime: 1.0, qualityScore: 8.9, throughput: 600, errorRate: 0.2 },
    { date: '2024-01-05', responseTime: 1.2, qualityScore: 8.8, throughput: 580, errorRate: 0.3 },
    { date: '2024-01-06', responseTime: 1.1, qualityScore: 8.4, throughput: 520, errorRate: 0.6 },
    { date: '2024-01-07', responseTime: 1.4, qualityScore: 8.3, throughput: 410, errorRate: 0.8 },
  ];

  const efficiencyScatterData = [
    { qualityScore: 8.5, responseTime: 1.2, agent: 'GPT-4', requests: 1200 },
    { qualityScore: 8.7, responseTime: 1.5, agent: 'Claude-3', requests: 980 },
    { qualityScore: 8.3, responseTime: 1.8, agent: 'Gemini Pro', requests: 760 },
    { qualityScore: 8.1, responseTime: 2.1, agent: 'Llama-2', requests: 650 },
    { qualityScore: 8.9, responseTime: 1.1, agent: 'GPT-4-Turbo', requests: 1450 },
    { qualityScore: 8.6, responseTime: 1.4, agent: 'Claude-3-Opus', requests: 890 },
  ];

  const agentColors = {
    'GPT-4': '#3b82f6',
    'Claude-3': '#10b981',
    'Gemini Pro': '#8b5cf6',
    'Llama-2': '#f59e0b',
    'GPT-4-Turbo': '#1e40af',
    'Claude-3-Opus': '#059669',
  };

  return (
    <div className="space-y-6">
      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends Over Time</CardTitle>
          <CardDescription>Response time, quality score, and throughput metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" domain={[0, 10]} label={{ value: 'Quality Score', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Response Time (s)', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="qualityScore" stroke="#10b981" strokeWidth={3} name="Quality Score" />
              <Line yAxisId="right" type="monotone" dataKey="responseTime" stroke="#3b82f6" strokeWidth={3} name="Response Time" />
              <Line yAxisId="right" type="monotone" dataKey="errorRate" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Error Rate %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Efficiency Scatter Plot */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Efficiency Matrix</CardTitle>
            <CardDescription>Quality score vs response time by agent</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={efficiencyScatterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="responseTime" name="Response Time" unit="s" />
                <YAxis dataKey="qualityScore" name="Quality Score" domain={[8, 9]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border rounded shadow-lg">
                        <p className="font-medium">{data.agent}</p>
                        <p className="text-sm">Quality: {data.qualityScore}</p>
                        <p className="text-sm">Response Time: {data.responseTime}s</p>
                        <p className="text-sm">Requests: {data.requests}</p>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Scatter dataKey="qualityScore">
                  {efficiencyScatterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={agentColors[entry.agent]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Key metrics for the selected time period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1.2s</div>
                  <div className="text-sm text-blue-800">Avg Response Time</div>
                  <Badge variant="secondary" className="mt-2">-8% vs last period</Badge>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">8.7</div>
                  <div className="text-sm text-green-800">Avg Quality Score</div>
                  <Badge variant="secondary" className="mt-2">+3% vs last period</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">99.7%</div>
                  <div className="text-sm text-purple-800">Uptime</div>
                  <Badge variant="secondary" className="mt-2">+0.1% vs last period</Badge>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">0.3%</div>
                  <div className="text-sm text-orange-800">Error Rate</div>
                  <Badge variant="secondary" className="mt-2">-0.2% vs last period</Badge>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Top Performing Agents</h4>
                <div className="space-y-2">
                  {['GPT-4-Turbo', 'GPT-4', 'Claude-3'].map((agent, index) => (
                    <div key={agent} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{agent}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={index === 0 ? 'default' : 'secondary'}>
                          #{index + 1}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { PerformanceChart };
