
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface AgentComparisonProps {
  timeRange: string;
}

const AgentComparison: React.FC<AgentComparisonProps> = ({ timeRange }) => {
  const agentMetrics = [
    {
      agent: 'GPT-4',
      responseTime: 1.2,
      qualityScore: 8.7,
      throughput: 1200,
      errorRate: 0.3,
      cost: 0.12,
      specialties: ['Code Generation', 'Complex Reasoning'],
      color: '#3b82f6'
    },
    {
      agent: 'Claude-3',
      responseTime: 1.5,
      qualityScore: 8.5,
      throughput: 980,
      errorRate: 0.2,
      cost: 0.09,
      specialties: ['Text Analysis', 'Creative Writing'],
      color: '#10b981'
    },
    {
      agent: 'Gemini Pro',
      responseTime: 1.8,
      qualityScore: 8.3,
      throughput: 760,
      errorRate: 0.4,
      cost: 0.08,
      specialties: ['Multimodal', 'Data Processing'],
      color: '#8b5cf6'
    },
    {
      agent: 'Llama-2',
      responseTime: 2.1,
      qualityScore: 8.1,
      throughput: 650,
      errorRate: 0.5,
      cost: 0.05,
      specialties: ['Open Source', 'Privacy'],
      color: '#f59e0b'
    }
  ];

  const radarData = agentMetrics.map(agent => ({
    agent: agent.agent,
    Speed: Math.max(0, 100 - (agent.responseTime * 30)),
    Quality: agent.qualityScore * 10,
    Throughput: (agent.throughput / 12),
    Reliability: Math.max(0, 100 - (agent.errorRate * 100)),
    'Cost Efficiency': Math.max(0, 100 - (agent.cost * 500))
  }));

  const getPerformanceGrade = (score: number) => {
    if (score >= 8.5) return { grade: 'A+', color: 'bg-green-500' };
    if (score >= 8.0) return { grade: 'A', color: 'bg-green-400' };
    if (score >= 7.5) return { grade: 'B+', color: 'bg-yellow-500' };
    if (score >= 7.0) return { grade: 'B', color: 'bg-yellow-400' };
    return { grade: 'C', color: 'bg-red-400' };
  };

  return (
    <div className="space-y-6">
      {/* Agent Performance Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Multi-Dimensional Agent Performance</CardTitle>
          <CardDescription>Comparative analysis across key performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="agent" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Tooltip />
              {agentMetrics.map((agent, index) => (
                <Radar
                  key={agent.agent}
                  dataKey={agent.agent}
                  stroke={agent.color}
                  fill={agent.color}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {agentMetrics.map((agent) => {
          const performanceGrade = getPerformanceGrade(agent.qualityScore);
          return (
            <Card key={agent.agent} className="relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 w-full h-1" 
                style={{ backgroundColor: agent.color }}
              />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{agent.agent}</CardTitle>
                  <div className={`px-2 py-1 rounded text-white text-sm font-bold ${performanceGrade.color}`}>
                    {performanceGrade.grade}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Response Time</div>
                    <div className="font-semibold">{agent.responseTime}s</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Quality Score</div>
                    <div className="font-semibold">{agent.qualityScore}/10</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Throughput</div>
                    <div className="font-semibold">{agent.throughput}/h</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Error Rate</div>
                    <div className="font-semibold">{agent.errorRate}%</div>
                  </div>
                </div>

                <div>
                  <div className="text-gray-600 text-sm mb-2">Cost per Request</div>
                  <div className="font-semibold text-lg">${agent.cost}</div>
                  <Progress 
                    value={100 - (agent.cost * 500)} 
                    className="mt-2"
                  />
                </div>

                <div>
                  <div className="text-gray-600 text-sm mb-2">Specialties</div>
                  <div className="space-y-1">
                    {agent.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Comparative Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics Comparison</CardTitle>
          <CardDescription>Side-by-side comparison of key performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agentMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="agent" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="qualityScore" fill="#3b82f6" name="Quality Score" />
              <Bar dataKey="throughput" fill="#10b981" name="Throughput (scaled)" transform="scale(0.01)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export { AgentComparison };
