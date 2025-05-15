
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle } from "lucide-react";

const SeoTools = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    // In a real implementation, we would analyze the URL's SEO
    // For this demo, we'll just simulate an analysis with demo data
    setTitle("Lovable Studio - AI Powered Productivity Tools");
    setDescription(
      "Boost your productivity with Lovable Studio's AI-powered tools for project management, voice input, and SEO optimization."
    );
    setKeywords("AI, voice input, productivity, project management, SEO tools");
    setAnalyzed(true);
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

  return (
    <Card>
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
              <Button onClick={handleAnalyze} disabled={!url}>
                Analyze
              </Button>
            </div>
          </div>

          {analyzed && (
            <>
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
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SeoTools;
