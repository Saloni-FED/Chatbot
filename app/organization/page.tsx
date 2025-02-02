"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ProgressSteps } from "@/components/progress-steps"
import { Loader2, Globe, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useRouter } from "next/navigation"

interface WebpageStatus {
  url: string
  status: "scraping" | "completed" | "pending" | "failed"
  chunks?: string[]
}

interface MetaDescription {
  loading: boolean
  description: string | null
  error: string | null
}

export default function OrganizationPage() {
  const router = useRouter()
  const [webpages, setWebpages] = useState<WebpageStatus[]>([])
  const [isScrapingInProgress, setIsScrapingInProgress] = useState(false)
  const [selectedWebpage, setSelectedWebpage] = useState<WebpageStatus | null>(null)
  const [metaDescription, setMetaDescription] = useState<MetaDescription>({
    loading: false,
    description: null,
    error: null,
  })

  const fetchMetaDescription = async (url: string) => {
    setMetaDescription({ loading: true, description: null, error: null })
    try {
      // Simulate API call to fetch meta description
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const description =
        "This is an auto-fetched meta description for your website. It provides a brief overview of your company and its services."
      setMetaDescription({ loading: false, description, error: null })
    } catch (error) {
      setMetaDescription({ loading: false, description: null, error: "Failed to fetch meta description" })
    }
  }

  const handleWebsiteUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    if (url && url.startsWith("http")) {
      await fetchMetaDescription(url)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const url = formData.get("website") as string

    // Simulate website scraping with multiple pages
    setIsScrapingInProgress(true)
    const pages = [url, `${url}/about`, `${url}/products`, `${url}/contact`]

    // Add pages with pending status
    setWebpages(
      pages.map((pageUrl) => ({
        url: pageUrl,
        status: "pending",
        chunks: [],
      })),
    )

    // Simulate progressive scraping
    for (let i = 0; i < pages.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setWebpages((prev) => {
        const newPages = [...prev]
        newPages[i] = {
          url: pages[i],
          status: "completed",
          chunks: ["Navigation menu content", "Main section content", "Product descriptions", "Contact information"],
        }
        return newPages
      })
    }

    setIsScrapingInProgress(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ProgressSteps
        currentStep={1}
        steps={[
          { title: "Registration", description: "Create your account" },
          { title: "Organization", description: "Set up your company" },
          { title: "Integration", description: "Test and deploy" },
        ]}
      />

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Set up your organization</CardTitle>
          <CardDescription>Enter your company details and website for chatbot training</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" name="company" placeholder="BeyondChats Inc." required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="website">Company Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://www.example.com"
                  onChange={handleWebsiteUrlChange}
                  required
                />
                {metaDescription.loading && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fetching website description...
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell us about your company..."
                  className="min-h-[100px]"
                  value={metaDescription.description || ""}
                  onChange={(e) => setMetaDescription((prev) => ({ ...prev, description: e.target.value }))}
                  required
                />
                {metaDescription.description && (
                  <p className="text-sm text-muted-foreground">✨ Auto-fetched from your website. Feel free to edit.</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isScrapingInProgress}>
              {isScrapingInProgress ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Website...
                </>
              ) : (
                "Start Website Analysis"
              )}
            </Button>
          </form>

          {webpages.length > 0 && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Website Analysis Status</h3>
                {webpages.some((page) => page.status === "completed") && (
                  <Button variant="outline" size="sm" onClick={() => (router.push('/integration'))}>
                    Continue to Integration
                  </Button>
                )}
              </div>
              <Accordion type="single" collapsible>
                {webpages.map((page, index) => (
                  <AccordionItem key={index} value={`page-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-4">
                        <Globe className="h-4 w-4" />
                        <span className="truncate">{page.url}</span>
                        <span className="flex items-center">
                          {page.status === "scraping" && (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin text-muted-foreground" />
                              <span className="text-muted-foreground">Scraping...</span>
                            </>
                          )}
                          {page.status === "completed" && (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              <span className="text-green-500">Completed</span>
                            </>
                          )}
                          {page.status === "pending" && (
                            <>
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Pending</span>
                            </>
                          )}
                          {page.status === "failed" && (
                            <>
                              <AlertCircle className="mr-2 h-4 w-4 text-destructive" />
                              <span className="text-destructive">Failed</span>
                            </>
                          )}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {page.chunks && page.chunks.length > 0 ? (
                        <div className="space-y-2 pl-4">
                          {page.chunks.map((chunk, i) => (
                            <div key={i} className="p-2 bg-muted rounded-md text-sm">
                              {chunk}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground pl-4">No data chunks available yet.</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

