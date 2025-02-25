import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import _ from 'lodash';
  }
}
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import _ from 'lodash';

interface AssetDataItem {
  name: string;
  type: string;
  totalValue: number;
  residentialValue: number;
  businessValue: number;
  industrialValue: number;
  utilitiesValue: number;
  farmValue: number;
  residentialPercent: number;
  businessPercent: number;
  industrialPercent: number;
}

const AssetDashboard = () => {
  const [assetData, setAssetData] = useState<AssetDataItem[]>([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('all');
  const [aggregateData, setAggregateData] = useState<{
    totalMunicipalities: number;
    totalAssetValue: number;
    averageAssetValue: number;
    assetComposition: { name: string; value: number; }[];
    percentageStats: {
      avgResidential: number;
      avgBusiness: number;
      avgIndustrial: number;
    };
  } | null>(null);
  const [municipalityTypes, setMunicipalityTypes] = useState<string[]>([]);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

  interface RawDataRow {
    [index: number]: string;
  }

  const updateAggregateData = useCallback((data: AssetDataItem[], type: string) => {
    const filteredData = type === 'all' ? data : data.filter(item => item.type === type);
    
    const totalAssets = _.sumBy(filteredData, 'totalValue');
    const aggregateStats = {
      totalMunicipalities: filteredData.length,
      totalAssetValue: totalAssets,
      averageAssetValue: totalAssets / filteredData.length,
      assetComposition: [
        { name: 'Residential', value: _.sumBy(filteredData, 'residentialValue') },
        { name: 'Business', value: _.sumBy(filteredData, 'businessValue') },
        { name: 'Industrial', value: _.sumBy(filteredData, 'industrialValue') },
        { name: 'Utilities', value: _.sumBy(filteredData, 'utilitiesValue') },
        { name: 'Farm', value: _.sumBy(filteredData, 'farmValue') }
      ],
      percentageStats: {
        avgResidential: _.meanBy(filteredData, 'residentialPercent'),
        avgBusiness: _.meanBy(filteredData, 'businessPercent'),
        avgIndustrial: _.meanBy(filteredData, 'industrialPercent')
      }
    };
    
    setAggregateData(aggregateStats);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();

        const data = JSON.parse(text)

      interface ProcessedDataRow {
        name: string;
        type: string;
        totalValue: number;
        residentialValue: number;
        businessValue: number;
        industrialValue: number;
        utilitiesValue: number;
        farmValue: number;
        residentialPercent: number;
        businessPercent: number;
        industrialPercent: number;
      }
  
      interface AggregateStats {
        totalMunicipalities: number;
        totalAssetValue: number;
        averageAssetValue: number;
        assetComposition: Array<{ name: string; value: number }>;
        percentageStats: {
          avgResidential: number;        
          avgBusiness: number;
          avgIndustrial: number;
        };
      }
  
      const processedData: ProcessedDataRow[] = data.body.map((row: RawDataRow) => ({
        name: row[0],
        type: row[1],
        totalValue: Number(row[2]),
        residentialValue: Number(row[3]),
        businessValue: Number(row[4]),
        industrialValue: Number(row[5]),
        utilitiesValue: Number(row[6]),
        farmValue: Number(row[7]),
        residentialPercent: Number(row[8]),
        businessPercent: Number(row[9]),
        industrialPercent: Number(row[10])
      }));
  
      setAssetData(processedData);
      setMunicipalityTypes(Array.from(new Set(processedData.map(item => item.type))));
      updateAggregateData(processedData, selectedType);

      const filteredData = selectedType === 'all' ? processedData : processedData.filter(item => item.type === selectedType);
      const totalAssets = _.sumBy(filteredData, 'totalValue');
      const aggregateStats: AggregateStats = {
        totalMunicipalities: filteredData.length,
        totalAssetValue: totalAssets,
        averageAssetValue: totalAssets / filteredData.length,
        assetComposition: [
          { name: 'Residential', value: _.sumBy(filteredData, 'residentialValue') },
          { name: 'Business', value: _.sumBy(filteredData, 'businessValue') },
          { name: 'Industrial', value: _.sumBy(filteredData, 'industrialValue') },
          { name: 'Utilities', value: _.sumBy(filteredData, 'utilitiesValue') },
          { name: 'Farm', value: _.sumBy(filteredData, 'farmValue') }
        ],
        percentageStats: {
          avgResidential: _.meanBy(filteredData, 'residentialPercent'),
          avgBusiness: _.meanBy(filteredData, 'businessPercent'),
          avgIndustrial: _.meanBy(filteredData, 'industrialPercent')
        }
      };
  
        setAggregateData(aggregateStats);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };

    loadData();
    }, [selectedType, updateAggregateData]);

  const handleTypeChange = (type: string): void => {
    setSelectedType(type);
    updateAggregateData(assetData, type);
  };


  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      notation: 'compact'
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getTopMunicipalities = () => {
    const filteredData = selectedType === 'all'
      ? assetData 
      : assetData.filter(item => item.type === selectedType);
    return _.orderBy(filteredData, ['totalValue'], ['desc']).slice(0, 10);
  };

  const getMunicipalityDetails = (municipality: string) => {
    if (!municipality) return null;

    const data = assetData.find(item => item.name === municipality);
    if (!data) return null;

    const compositionData = [
      { name: 'Residential', value: data.residentialValue, percent: data.residentialPercent },
      { name: 'Business', value: data.businessValue, percent: data.businessPercent },
      { name: 'Industrial', value: data.industrialValue, percent: data.industrialPercent },
      { name: 'Utilities', value: data.utilitiesValue },
      { name: 'Farm', value: data.farmValue }
    ];

    return {
      ...data,
      compositionData
    };
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">BC Municipal Asset Dashboard</h1>
        <Select value={selectedType} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {municipalityTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {aggregateData && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Total Municipalities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{aggregateData.totalMunicipalities}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Asset Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{formatValue(aggregateData.totalAssetValue)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Asset Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{formatValue(aggregateData.averageAssetValue)}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Asset Composition Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              {aggregateData && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={aggregateData.assetComposition}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={130}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {aggregateData.assetComposition.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatValue(Number(value))} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Property Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              {aggregateData && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Residential</span>
                      <span className="font-bold">{formatPercent(aggregateData.percentageStats.avgResidential)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full"        
                        style={{width: `${aggregateData.percentageStats.avgResidential}%`}}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Business</span>
                      <span className="font-bold">{formatPercent(aggregateData.percentageStats.avgBusiness)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full"        
                        style={{width: `${aggregateData.percentageStats.avgBusiness}%`}}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Industrial</span>
                      <span className="font-bold">{formatPercent(aggregateData.percentageStats.avgIndustrial)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-yellow-600 h-2.5 rounded-full"        
                        style={{width: `${aggregateData.percentageStats.avgIndustrial}%`}}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top 10 Municipalities by Total Asset Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getTopMunicipalities()}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 70,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis tickFormatter={formatValue} />
                <Tooltip formatter={(value) => formatValue(Number(value))} />
                <Legend />
                <Bar dataKey="residentialValue" fill="#8884d8" name="Residential" />
                <Bar dataKey="businessValue" fill="#82ca9d" name="Business" />
                <Bar dataKey="industrialValue" fill="#ffc658" name="Industrial" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Municipality Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Municipality</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Residential %</TableHead>
                  <TableHead>Business %</TableHead>
                  <TableHead>Industrial %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getTopMunicipalities().map((municipality) => (
                  <TableRow 
                    key={municipality.name} 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedMunicipality(municipality.name)}
                  >
                    <TableCell>{municipality.name}</TableCell>
                    <TableCell>{municipality.type}</TableCell>
                    <TableCell>{formatValue(municipality.totalValue)}</TableCell>
                    <TableCell>{formatPercent(municipality.residentialPercent)}</TableCell>
                    <TableCell>{formatPercent(municipality.businessPercent)}</TableCell>
                    <TableCell>{formatPercent(municipality.industrialPercent)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedMunicipality} onOpenChange={() => setSelectedMunicipality(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedMunicipality}</DialogTitle>
          </DialogHeader>
          {selectedMunicipality && (
            <div className="space-y-4">
              {getMunicipalityDetails(selectedMunicipality) && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Asset Values</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total Value:</span>
                          <span>{formatValue(getMunicipalityDetails(selectedMunicipality)?.totalValue ?? 0)}</span>
                        </div>
                        {getMunicipalityDetails(selectedMunicipality)?.compositionData?.map((item) => (
                          <div key={item.name}>
                            <div className="flex justify-between">
                              <span>{item.name}:</span>
                              <span>{formatValue(item.value)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        );
      };

      export default AssetDashboard;