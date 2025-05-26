
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';
import { TrendingUp, Lightbulb, Target, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

const PredictiveInsights: React.FC = () => {
  const recommendations = [
    {
      id: 1,
      type: 'optimization',
      priority: 'high',
      title: 'Optimize GPT-4 Usage for Web Development',
      description: 'Based on performance data, GPT-4 shows 15% better quality scores for web development projects. Consider routing more web dev tasks to this agent.',
      impact: '+12% quality improvement',
      effort: 'Low',
      icon: <Target className="h-5 w-5" />,
      color: 'border-l-blue-500'
    },
    {
      id: 2,
      type: 'cost',
      priority: 'medium',
      title: 'Load Balance Data Analysis Tasks',
      description: 'Claude-3 handles data analysis with 20% lower cost while maintaining quality. Redistributing load could save $2,400/month.',
      impact: '$2,400/month savings',
      effort: 'Medium',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'border-l-green-500'
    },
    {
      id: 3,
      type: 'performance',
      priority: 'high',
      title: 'Address Content Creation Bottleneck',
      description: 'Response times for content creation increased 18% last week. Consider scaling or optimizing prompt engineering.',
      impact: '-30% response time',
      effort: 'High',
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'border-l-red-500'
    },
    {
      id: 4,
      type: 'opportunity',
      priority: 'low',
      title: 'Explore Mobile Development Expansion',
      description: 'Mobile dev projects show highest growth (25%) but lowest volume. Market opportunity for specialized optimization.',
      impact: '+40% capacity',
      effort: 'Medium',
      icon: <Lightbulb className="h-5 w-5" />,
      color: 'border-l-purple-500'
    }
  ];

  const forecastData = [
    { period: 'Current', volume: 12000, quality: 8.7, cost: 1200 },
    { period: 'Week 1', volume: 12500, quality: 8.8, cost: 1150 },
    { period: 'Week 2', volume: 13200, quality: 8.9, cost: 1100 },
    { period: 'Week 3', volume: 13800, quality: 9.0, cost: 1050 },
    { period: 'Month 1', volume: 15000, quality: 9.1, cost: 1000 },
  ];

  const agentOptimalMatches = [
    { project: 'Web Development', agent: 'GPT-4', confidence: 92, currentUsage: 78 },
    { project: 'Data Analysis', agent: 'Claude-3', confidence: 89, currentUsage: 85 },
    { project: 'Content Creation', agent: 'GPT-4', confidence: 87, currentUsage: 72 },
    { project: 'API Integration', agent: 'Claude-3', confidence: 91, currentUsage: 68 },
    { project: 'Mobile Development', agent: 'GPT-4', confidence: 88, currentUsage: 82 },
    { project: 'DevOps', agent: 'Claude-3', confidence: 93, currentUsage: 75 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI-Powered Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            AI-Powered Optimization Recommendations
          </CardTitle>
          <CardDescription>
            Machine learning insights for improving agent performance and cost efficiency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className={`border-l-4 ${rec.color} pl-4 py-3 bg-gray-50 rounded-r-lg`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">{rec.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{rec.title}</h3>
                        <Badge className={getPriorityColor(rec.priority)} variant="secondary">
                          {rec.priority} priority
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-medium text-green-600">Impact: {rec.impact}</span>
                        <span className="text-gray-500">Effort: {rec.effort}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Implement
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Forecast</CardTitle>
            <CardDescription>Predicted improvements with optimizations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis yAxisId="left" domain={[8.5, 9.2]} />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="quality" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  name="Quality Score"
                  strokeDasharray="5 5"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  name="Volume"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Optimal Agent Matching */}
        <Card>
          <CardHeader>
            <CardTitle>Optimal Agent-Project Matching</CardTitle>
            <CardDescription>AI recommendations vs current usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentOptimalMatches.map((match, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{match.project}</span>
                      <Badge variant="outline">{match.agent}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">AI Confidence: </span>
                        <span className="font-medium">{match.confidence}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Current Usage: </span>
                        <span className="font-medium">{match.currentUsage}%</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Optimization Potential</span>
                        <span>{Math.abs(match.confidence - match.currentUsage)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            match.confidence > match.currentUsage ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ 
                            width: `${Math.min(100, Math.abs(match.confidence - match.currentUsage) * 2)}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Recommended Action Plan
          </CardTitle>
          <CardDescription>Step-by-step optimization strategy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border-2 border-dashed border-blue-200 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">Week 1</div>
              <h3 className="font-semibold mb-2">Quick Wins</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Redistribute web dev tasks to GPT-4</li>
                <li>• Implement load balancing for data analysis</li>
                <li>• Monitor response time improvements</li>
              </ul>
            </div>
            
            <div className="text-center p-4 border-2 border-dashed border-green-200 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">Week 2-3</div>
              <h3 className="font-semibold mb-2">Optimization</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Fine-tune prompt engineering</li>
                <li>• Scale content creation capacity</li>
                <li>• A/B test new agent configurations</li>
              </ul>
            </div>
            
            <div className="text-center p-4 border-2 border-dashed border-purple-200 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">Month 1+</div>
              <h3 className="font-semibold mb-2">Strategic Growth</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Expand mobile development capabilities</li>
                <li>• Implement advanced ML recommendations</li>
                <li>• Plan next quarter improvements</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { PredictiveInsights };
