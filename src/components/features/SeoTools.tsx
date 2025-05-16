
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SeoTools = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [headings, setHeadings] = useState<{h1: number, h2: number, h3: number, otherH: number}>({ h1: 0, h2: 0, h3: 0, otherH: 0 });
  const [imgCount, setImgCount] = useState<{total: number, withAlt: number}>({ total: 0, withAlt: 0 });
  const [analyzed, setAnalyzed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [seoScore, setSeoScore] = useState(0);
  const { toast } = useToast();

  const handleAnalyze = () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a URL to analyze",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    
    // In a real implementation, we would analyze the URL's SEO via API
    // For this demo, we'll simulate an analysis with demo data
    setTimeout(() => {
      setTitle("Lovable Studio - AI Powered Productivity Tools");
      setDescription(
        "Boost your productivity with Lovable Studio's AI-powered tools for project management, voice input, and SEO optimization."
      );
      setKeywords("AI, voice input, productivity, project management, SEO tools");
      setHeadings({ h1: 1, h2: 3, h3: 5, otherH: 2 });
      setImgCount({ total: 6, withAlt: 4 });
      setSeoScore(78);
      setAnalyzed(true);
      setAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "SEO analysis has been completed successfully",
      });
    }, 1500);
  };

  const calculateScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const calculateProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  const generateMetaTags = () => {
    return `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${description}" />`;
  };

  const getSeoRecommendations = () => {
    const recommendations = [];

    if (title.length > 60) {
      recommendations.push("Shorten your title tag to 60 characters or less");
    }

    if (description.length > 160) {
      recommendations.push("Shorten your meta description to 160 characters or less");
    }

    if (headings.h1 !== 1) {
      recommendations.push("Ensure your page has exactly one H1 heading");
    }

    if (imgCount.withAlt < imgCount.total) {
      recommendations.push(`Add alt text to ${imgCount.total - imgCount.withAlt} images`);
    }

    if (keywords.split(",").length < 3) {
      recommendations.push("Add more relevant keywords (at least 3-5)");
    }

    if (recommendations.length === 0) {
      recommendations.push("Great job! Your page follows SEO best practices.");
    }

    return recommendations;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SEO Tools</CardTitle>
        <CardDescription>
          Analyze and optimize your content for better search engine visibility
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button onClick={handleAnalyze} disabled={!url || analyzing}>
                {analyzing ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </div>

          {analyzed && (
            <Tabs defaultValue="overview" className="w-full pt-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="meta">Meta Tags</TabsTrigger>
                <TabsTrigger value="structure">Page Structure</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="text-center pb-4">
                  <div className={`text-4xl font-bold ${calculateScoreColor(seoScore)}`}>{seoScore}/100</div>
                  <p className="text-muted-foreground mt-1">SEO Score</p>
                  <Progress value={seoScore} className={`h-2 mt-2 ${calculateProgressColor(seoScore)}`} />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">Meta Information</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Title</span>
                        {title.length <= 60 ? (
                          <span className="text-green-500 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" /> Good
                          </span>
                        ) : (
                          <span className="text-red-500 flex items-center">
                            <XCircle className="h-3 w-3 mr-1" /> Too Long
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Description</span>
                        {description.length <= 160 ? (
                          <span className="text-green-500 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" /> Good
                          </span>
                        ) : (
                          <span className="text-red-500 flex items-center">
                            <XCircle className="h-3 w-3 mr-1" /> Too Long
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">Page Structure</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>H1 Headings</span>
                        {headings.h1 === 1 ? (
                          <span className="text-green-500 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" /> Good (1)
                          </span>
                        ) : (
                          <span className="text-amber-500 flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1" /> {headings.h1}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Images with Alt Text</span>
                        {imgCount.withAlt === imgCount.total ? (
                          <span className="text-green-500 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" /> {imgCount.withAlt}/{imgCount.total}
                          </span>
                        ) : (
                          <span className="text-amber-500 flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1" /> {imgCount.withAlt}/{imgCount.total}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="meta" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Meta Title
                    {title.length <= 60 ? (
                      <span className="ml-2 text-xs text-green-500 inline-flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" /> Good length
                        ({title.length}/60)
                      </span>
                    ) : (
                      <span className="ml-2 text-xs text-red-500 inline-flex items-center">
                        <XCircle className="h-3 w-3 mr-1" /> Too long
                        ({title.length}/60)
                      </span>
                    )}
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Meta Description
                    {description.length <= 160 ? (
                      <span className="ml-2 text-xs text-green-500 inline-flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" /> Good length
                        ({description.length}/160)
                      </span>
                    ) : (
                      <span className="ml-2 text-xs text-red-500 inline-flex items-center">
                        <XCircle className="h-3 w-3 mr-1" /> Too long
                        ({description.length}/160)
                      </span>
                    )}
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (comma separated)</Label>
                  <Input
                    id="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="productivity, AI tools, project management"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta-tags">Generated Meta Tags</Label>
                  <div className="relative">
                    <Textarea
                      id="meta-tags"
                      value={generateMetaTags()}
                      readOnly
                      className="font-mono text-xs h-40"
                    />
                    <Button
                      className="absolute top-2 right-2"
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(generateMetaTags());
                        toast({
                          title: "Copied!",
                          description: "Meta tags copied to clipboard",
                        });
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="structure" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">{headings.h1}</div>
                    <p className="text-sm text-muted-foreground">H1 Tags</p>
                    {headings.h1 === 1 ? (
                      <div className="text-xs text-green-500 mt-1 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 mr-1" /> Optimal
                      </div>
                    ) : (
                      <div className="text-xs text-amber-500 mt-1 flex items-center justify-center">
                        <AlertTriangle className="h-3 w-3 mr-1" /> {headings.h1 > 1 ? "Too many" : "Missing"}
                      </div>
                    )}
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">{headings.h2}</div>
                    <p className="text-sm text-muted-foreground">H2 Tags</p>
                    <div className="text-xs text-muted-foreground mt-1">Structure sections</div>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">{headings.h3}</div>
                    <p className="text-sm text-muted-foreground">H3 Tags</p>
                    <div className="text-xs text-muted-foreground mt-1">Sub-sections</div>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">{imgCount.withAlt}/{imgCount.total}</div>
                    <p className="text-sm text-muted-foreground">Images with Alt Text</p>
                    {imgCount.withAlt === imgCount.total ? (
                      <div className="text-xs text-green-500 mt-1 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 mr-1" /> Complete
                      </div>
                    ) : (
                      <div className="text-xs text-amber-500 mt-1 flex items-center justify-center">
                        <AlertTriangle className="h-3 w-3 mr-1" /> Incomplete
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 mt-4">
                  <h3 className="text-sm font-medium mb-2">Headings Structure</h3>
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-100 rounded-md w-full relative overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: `${(headings.h1 / (headings.h1 + headings.h2 + headings.h3 + headings.otherH)) * 100}%` }}></div>
                      <span className="absolute inset-0 flex items-center justify-center text-xs">H1</span>
                    </div>
                    <div className="h-6 bg-gray-100 rounded-md w-full relative overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: `${(headings.h2 / (headings.h1 + headings.h2 + headings.h3 + headings.otherH)) * 100}%` }}></div>
                      <span className="absolute inset-0 flex items-center justify-center text-xs">H2</span>
                    </div>
                    <div className="h-6 bg-gray-100 rounded-md w-full relative overflow-hidden">
                      <div className="bg-amber-500 h-full" style={{ width: `${(headings.h3 / (headings.h1 + headings.h2 + headings.h3 + headings.otherH)) * 100}%` }}></div>
                      <span className="absolute inset-0 flex items-center justify-center text-xs">H3</span>
                    </div>
                    <div className="h-6 bg-gray-100 rounded-md w-full relative overflow-hidden">
                      <div className="bg-red-500 h-full" style={{ width: `${(headings.otherH / (headings.h1 + headings.h2 + headings.h3 + headings.otherH)) * 100}%` }}></div>
                      <span className="absolute inset-0 flex items-center justify-center text-xs">Other</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations" className="space-y-4 pt-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-4">SEO Recommendations</h3>
                  <ul className="space-y-3">
                    {getSeoRecommendations().map((recommendation, index) => (
                      <li key={index} className="flex">
                        <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-2">SEO Best Practices</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Keep title tags between 50-60 characters</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Meta descriptions should be 150-160 characters</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Use exactly one H1 tag per page</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>All images should have descriptive alt text</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Use keywords naturally, avoid stuffing</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Analyze your web pages for SEO best practices
        </div>
        {analyzed && (
          <Button variant="outline" onClick={() => setAnalyzed(false)}>
            Reset
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SeoTools;
