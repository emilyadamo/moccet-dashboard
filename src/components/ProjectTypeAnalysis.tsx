
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Treemap } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ProjectTypeAnalysisProps {
  timeRange: string;
}

const ProjectTypeAnalysis: React.FC<ProjectTypeAnalysisProps> = ({ timeRange }) => {
  const projectTypes = [
    {
      type: 'Web Development',
      volume: 3200,
      avgQuality: 8.7,
      avgTime: 1.2,
      topAgent: 'GPT-4',
      growth: 12,
      color: '#3b82f6'
    },
    {
      type: 'Data Analysis',
      volume: 2800,
      avgQuality: 8.9,
      avgTime: 1.8,
      topAgent: 'Claude-3',
      growth: 18,
      color: '#10b981'
    },
    {
      type: 'Content Creation',
      volume: 2400,
      avgQuality: 8.4,
      avgTime: 2.1,
      topAgent: 'GPT-4',
      growth: -3,
      color: '#8b5cf6'
    },
    {
      type: 'API Integration',
      volume: 1900,
      avgQuality: 8.6,
      avgTime: 1.5,
      topAgent: 'Claude-3',
      growth: 8,
      color: '#f59e0b'
    },
    {
      type: 'Mobile Development',
      volume: 1600,
      avgQuality: 8.3,
      avgTime: 1.9,
      topAgent: 'GPT-4',
      growth: 25,
      color: '#ef4444'
    },
    {
      type: 'DevOps',
      volume: 1200,
      avgQuality: 8.8,
      avgTime: 1.4,
      topAgent: 'Claude-3',
      growth: 15,
      color: '#06b6d4'
    }
  ];

  const agentProjectMatrix = [
    { project: 'Web Dev', gpt4: 85, claude3: 78, gemini: 72, llama2: 65 },
    { project: 'Data Analysis', gpt4: 82, claude3: 88, gemini: 85, llama2: 70 },
    { project: 'Content', gpt4: 87, claude3: 84, gemini: 79, llama2: 75 },
    { project: 'API Integration', gpt4: 83, claude3: 86, gemini: 80, llama2: 68 },
    { project: 'Mobile Dev', gpt4: 86, claude3: 81, gemini: 76, llama2: 72 },
    { project: 'DevOps', gpt4: 80, claude3: 85, gemini: 82, llama2: 74 }
  ];

  const treemapData = projectTypes.map(project => ({
    name: project.type,
    size: project.volume,
    quality: project.avgQuality,
    fill: project.color
  }));

  const getTrendIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (growth < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">Volume: {data.size.toLocaleString()}</p>
          <p className="text-sm">Quality: {data.quality}/10</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Project Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Volume Distribution</CardTitle>
            <CardDescription>Request volume by project type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="volume"
                  nameKey="type"
                >
                  {projectTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Complexity Heatmap</CardTitle>
            <CardDescription>Volume and quality visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <Treemap
                data={treemapData}
                dataKey="size"
                ratio={4/3}
                stroke="#fff"
                content={<CustomTooltip />}
              />
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Project Type Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Type Performance Analysis</CardTitle>
          <CardDescription>Detailed metrics for each project category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectTypes.map((project) => (
              <div key={project.type} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{project.type}</h3>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(project.growth)}
                    <span className={`text-sm font-medium ${
                      project.growth > 0 ? 'text-green-600' : 
                      project.growth < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {project.growth > 0 ? '+' : ''}{project.growth}%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volume:</span>
                    <span className="font-medium">{project.volume.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Quality:</span>
                    <span className="font-medium">{project.avgQuality}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Time:</span>
                    <span className="font-medium">{project.avgTime}s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Top Agent:</span>
                    <Badge variant="secondary">{project.topAgent}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agent-Project Performance Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Performance by Project Type</CardTitle>
          <CardDescription>Success rates across different project categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={agentProjectMatrix} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="project" />
              <YAxis domain={[60, 90]} />
              <Tooltip />
              <Bar dataKey="gpt4" fill="#3b82f6" name="GPT-4" />
              <Bar dataKey="claude3" fill="#10b981" name="Claude-3" />
              <Bar dataKey="gemini" fill="#8b5cf6" name="Gemini Pro" />
              <Bar dataKey="llama2" fill="#f59e0b" name="Llama-2" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export { ProjectTypeAnalysis };
