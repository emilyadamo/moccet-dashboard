
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, GitBranch, Zap, CheckCircle, AlertCircle, Clock, Play, Pause } from 'lucide-react';

const DataPipeline: React.FC = () => {
  const [pipelineStatus, setPipelineStatus] = useState<'running' | 'paused' | 'error'>('running');

  const pipelineStages = [
    {
      id: 1,
      name: 'Data Ingestion',
      description: 'Collecting agent performance data from multiple sources',
      status: 'completed',
      duration: '2.3s',
      throughput: '15,000 records/min',
      sources: ['API Logs', 'Response Times', 'Quality Scores', 'Error Rates']
    },
    {
      id: 2,
      name: 'Data Validation',
      description: 'Validating data integrity and format consistency',
      status: 'completed',
      duration: '1.8s',
      throughput: '12,000 records/min',
      sources: ['Schema Validation', 'Null Checks', 'Range Validation']
    },
    {
      id: 3,
      name: 'Feature Engineering',
      description: 'Creating performance metrics and aggregations',
      status: 'running',
      duration: '4.2s',
      throughput: '8,500 records/min',
      sources: ['Avg Calculations', 'Trend Analysis', 'Agent Scoring']
    },
    {
      id: 4,
      name: 'ML Processing',
      description: 'Running predictive models and recommendations',
      status: 'pending',
      duration: '6.1s',
      throughput: '5,200 records/min',
      sources: ['Performance Prediction', 'Anomaly Detection', 'Optimization']
    },
    {
      id: 5,
      name: 'Data Storage',
      description: 'Storing processed data in analytics warehouse',
      status: 'pending',
      duration: '1.5s',
      throughput: '20,000 records/min',
      sources: ['Time Series DB', 'Aggregation Tables', 'Cache Updates']
    }
  ];

  const sqlQueries = [
    {
      name: 'Agent Performance Summary',
      description: 'Calculate average response times and quality scores',
      query: `SELECT 
  agent_name,
  AVG(response_time) as avg_response_time,
  AVG(quality_score) as avg_quality_score,
  COUNT(*) as total_requests,
  (COUNT(*) * 100.0 / SUM(COUNT(*)) OVER ()) as usage_percentage
FROM agent_performance 
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY agent_name
ORDER BY avg_quality_score DESC;`,
      status: 'optimized'
    },
    {
      name: 'Project Type Analysis',
      description: 'Analyze performance trends by project category',
      query: `WITH project_metrics AS (
  SELECT 
    project_type,
    agent_name,
    AVG(quality_score) as avg_quality,
    AVG(response_time) as avg_time,
    COUNT(*) as volume
  FROM agent_performance ap
  JOIN projects p ON ap.project_id = p.id
  WHERE ap.created_at >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY project_type, agent_name
)
SELECT 
  project_type,
  agent_name,
  avg_quality,
  avg_time,
  volume,
  RANK() OVER (PARTITION BY project_type ORDER BY avg_quality DESC) as quality_rank
FROM project_metrics;`,
      status: 'running'
    },
    {
      name: 'Anomaly Detection',
      description: 'Identify performance anomalies and outliers',
      query: `WITH performance_stats AS (
  SELECT 
    agent_name,
    AVG(response_time) as mean_time,
    STDDEV(response_time) as std_time,
    AVG(quality_score) as mean_quality,
    STDDEV(quality_score) as std_quality
  FROM agent_performance 
  WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
  GROUP BY agent_name
)
SELECT 
  ap.id,
  ap.agent_name,
  ap.response_time,
  ap.quality_score,
  CASE 
    WHEN ABS(ap.response_time - ps.mean_time) > 2 * ps.std_time 
    THEN 'TIME_ANOMALY'
    WHEN ABS(ap.quality_score - ps.mean_quality) > 2 * ps.std_quality 
    THEN 'QUALITY_ANOMALY'
    ELSE 'NORMAL'
  END as anomaly_type
FROM agent_performance ap
JOIN performance_stats ps ON ap.agent_name = ps.agent_name
WHERE ap.created_at >= CURRENT_DATE - INTERVAL '1 day'
AND (ABS(ap.response_time - ps.mean_time) > 2 * ps.std_time 
     OR ABS(ap.quality_score - ps.mean_quality) > 2 * ps.std_quality);`,
      status: 'scheduled'
    }
  ];

  const dataFlowMetrics = {
    totalRecords: 1247392,
    recordsToday: 45623,
    avgProcessingTime: 3.2,
    errorRate: 0.2,
    dataQuality: 99.7,
    storageUsed: 2.4
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'running': return <Zap className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'pending': return <Clock className="h-4 w-4 text-gray-400" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      running: 'bg-blue-100 text-blue-800',
      pending: 'bg-gray-100 text-gray-800',
      error: 'bg-red-100 text-red-800',
      optimized: 'bg-green-100 text-green-800',
      scheduled: 'bg-yellow-100 text-yellow-800'
    };
    
    return <Badge className={colors[status as keyof typeof colors] || colors.pending}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Records</p>
                <p className="text-2xl font-bold">{dataFlowMetrics.totalRecords.toLocaleString()}</p>
              </div>
              <Database className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processing Time</p>
                <p className="text-2xl font-bold">{dataFlowMetrics.avgProcessingTime}s</p>
              </div>
              <Zap className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Data Quality</p>
                <p className="text-2xl font-bold">{dataFlowMetrics.dataQuality}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold">{dataFlowMetrics.storageUsed}TB</p>
              </div>
              <GitBranch className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pipeline" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pipeline">Pipeline Status</TabsTrigger>
          <TabsTrigger value="sql">SQL Queries</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Data Processing Pipeline
                  </CardTitle>
                  <CardDescription>Real-time data flow and processing stages</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={pipelineStatus === 'running' ? 'default' : 'outline'}
                    onClick={() => setPipelineStatus(pipelineStatus === 'running' ? 'paused' : 'running')}
                  >
                    {pipelineStatus === 'running' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {pipelineStatus === 'running' ? 'Pause' : 'Resume'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {pipelineStages.map((stage, index) => (
                  <div key={stage.id} className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(stage.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{stage.name}</h3>
                          {getStatusBadge(stage.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{stage.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Duration: </span>
                            <span className="font-medium">{stage.duration}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Throughput: </span>
                            <span className="font-medium">{stage.throughput}</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-2">
                            {stage.sources.map((source) => (
                              <Badge key={source} variant="outline" className="text-xs">
                                {source}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {stage.status === 'running' && (
                          <div className="mt-3">
                            <Progress value={67} className="w-full" />
                            <p className="text-xs text-gray-500 mt-1">Processing... 67% complete</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {index < pipelineStages.length - 1 && (
                      <div className="absolute left-2 top-8 w-px h-8 bg-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sql">
          <Card>
            <CardHeader>
              <CardTitle>SQL Query Performance</CardTitle>
              <CardDescription>Analytics queries and their execution status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sqlQueries.map((query, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{query.name}</h3>
                      {getStatusBadge(query.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{query.description}</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono">
                        {query.query}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle>System Monitoring</CardTitle>
              <CardDescription>Real-time monitoring of data pipeline health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Data Quality Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completeness</span>
                        <span>99.8%</span>
                      </div>
                      <Progress value={99.8} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Accuracy</span>
                        <span>99.5%</span>
                      </div>
                      <Progress value={99.5} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Consistency</span>
                        <span>99.9%</span>
                      </div>
                      <Progress value={99.9} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU Usage</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory Usage</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Network I/O</span>
                        <span>23%</span>
                      </div>
                      <Progress value={23} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { DataPipeline };
