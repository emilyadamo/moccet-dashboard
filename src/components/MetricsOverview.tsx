
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface MetricsOverviewProps {
  timeRange: string;
  selectedAgent: string;
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ timeRange, selectedAgent }) => {
  const responseTimeData = [
    { time: '00:00', gpt4: 1.2, claude3: 1.5, gemini: 1.8, llama2: 2.1 },
    { time: '04:00', gpt4: 1.1, claude3: 1.4, gemini: 1.7, llama2: 2.0 },
    { time: '08:00', gpt4: 1.3, claude3: 1.6, gemini: 1.9, llama2: 2.2 },
    { time: '12:00', gpt4: 1.4, claude3: 1.7, gemini: 2.0, llama2: 2.3 },
    { time: '16:00', gpt4: 1.2, claude3: 1.5, gemini: 1.8, llama2: 2.1 },
    { time: '20:00', gpt4: 1.1, claude3: 1.4, gemini: 1.7, llama2: 2.0 },
  ];

  const qualityScoreData = [
    { date: 'Mon', score: 8.5, requests: 1200 },
    { date: 'Tue', score: 8.7, requests: 1350 },
    { date: 'Wed', score: 8.6, requests: 1100 },
    { date: 'Thu', score: 8.9, requests: 1450 },
    { date: 'Fri', score: 8.8, requests: 1600 },
    { date: 'Sat', score: 8.4, requests: 800 },
    { date: 'Sun', score: 8.3, requests: 750 },
  ];

  const taskTypePerformance = [
    { type: 'Code Generation', accuracy: 92, speed: 1.1, volume: 2400 },
    { type: 'Text Analysis', accuracy: 89, speed: 0.8, volume: 1800 },
    { type: 'Data Processing', accuracy: 95, speed: 1.5, volume: 1200 },
    { type: 'Creative Writing', accuracy: 87, speed: 2.1, volume: 900 },
    { type: 'Q&A', accuracy: 91, speed: 0.9, volume: 3200 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Response Time Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Response Time Trends</CardTitle>
          <CardDescription>Average response times by agent over 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="gpt4" stroke="#3b82f6" strokeWidth={2} name="GPT-4" />
              <Line type="monotone" dataKey="claude3" stroke="#10b981" strokeWidth={2} name="Claude-3" />
              <Line type="monotone" dataKey="gemini" stroke="#8b5cf6" strokeWidth={2} name="Gemini Pro" />
              <Line type="monotone" dataKey="llama2" stroke="#f59e0b" strokeWidth={2} name="Llama-2" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quality Score Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Quality Score & Request Volume</CardTitle>
          <CardDescription>Daily quality scores with request volume</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={qualityScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" domain={[8, 9]} label={{ value: 'Quality Score', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Requests', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Area yAxisId="left" type="monotone" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Bar yAxisId="right" dataKey="requests" fill="#10b981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Task Type Performance */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Performance by Task Type</CardTitle>
          <CardDescription>Accuracy, speed, and volume metrics across different task categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taskTypePerformance.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{task.type}</h3>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Accuracy: {task.accuracy}%</Badge>
                      <Badge variant="outline">Speed: {task.speed}s</Badge>
                      <Badge>Volume: {task.volume.toLocaleString()}</Badge>
                    </div>
                  </div>
                </div>
                <div className="w-32">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Performance</span>
                    <span>{task.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${task.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { MetricsOverview };
