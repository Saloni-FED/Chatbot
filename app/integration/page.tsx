"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressSteps } from "@/components/progress-steps"
import {
  ExternalLink,
  MessageCircle,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  AlertCircle,
  CheckCircle,
  Loader2,
  Code,
  Mail,
  MessageSquare,
  AlertTriangle,
} from "lucide-react"
import confetti from "canvas-confetti"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { fadeIn, slideIn, scaleIn, staggerChildren, chatBubble, buttonHover, buttonTap } from "@/lib/animations"

const steps = [
  { title: "Registration", description: "Create your account" },
  { title: "Organization", description: "Set up your company" },
  { title: "Integration", description: "Test and deploy" },
]

export default function IntegrationPage() {
  const [integrationStatus, setIntegrationStatus] = useState<"idle" | "testing" | "success" | "failed">("idle")
  const [showDemoChat, setShowDemoChat] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! How can I help you today?",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#4f46e5", "#ec4899", "#16a34a"],
    })
  }

  const handleTestIntegration = async () => {
    setIntegrationStatus("testing")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const isSuccessful = true

    if (isSuccessful) {
      setIntegrationStatus("success")
      triggerConfetti()
    } else {
      setIntegrationStatus("failed")
    }
  }

  const integrationCode = `<!-- Add this code to your website's <head> section -->
<script src="https://beyondchats.com/widget.js"></script>
<script>
  BeyondChats.init({
    companyId: "your-company-id",
    theme: "light"
  });
</script>`

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage = {
      role: "user",
      content: inputMessage,
    }

    const botMessage = {
      role: "assistant",
      content: inputMessage,
    }

    setMessages((prev) => [...prev, userMessage, botMessage])
    setInputMessage("")
  }

  return (
    <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={staggerChildren}>
      <ProgressSteps currentStep={2} steps={steps} />

      <motion.div variants={fadeIn}>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Chatbot Integration & Testing</CardTitle>
            <CardDescription>Follow these steps to integrate your chatbot</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div className="space-y-8" variants={staggerChildren}>
              {/* Test Chatbot Section */}
              <motion.div variants={slideIn}>
                <h3 className="text-lg font-semibold mb-4">1. Test Your Chatbot</h3>
                <Button
                  onClick={() => setShowDemoChat(true)}
                  variant="secondary"
                  className="bg-secondary hover:bg-secondary-dark text-slate-500"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  <MessageSquare className="mr-2 h-4 w-4 " />
                  Test Chatbot
                </Button>
              </motion.div>

              {/* Integration Section */}
              <motion.div variants={slideIn}>
                <h3 className="text-lg font-semibold mb-4">2. Add to Your Website</h3>
                <Tabs defaultValue="code" className="w-full">
                  <TabsList className="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-0 bg-primary/5">
                    <TabsTrigger value="code" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                      Copy Installation Code
                    </TabsTrigger>
                    <TabsTrigger
                      value="email"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      Email to Developer
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="code" className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Copy and paste this code into the &lt;head&gt; section of your website:
                    </p>
                    <pre className="p-4 bg-primary/5 rounded-lg overflow-x-auto">
                      <code>{integrationCode}</code>
                    </pre>
                    <Button
                      onClick={() => navigator.clipboard.writeText(integrationCode)}
                      variant="outline"
                      className="border-primary hover:bg-primary/5 text-slate-500"
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                    >
                      <Code className="mr-2 h-4 w-4" />
                      Copy Code
                    </Button>
                  </TabsContent>
                  <TabsContent value="email" className="space-y-4">
                    <div className="block md:hidden"></div>
                    <p className="text-sm text-muted-foreground">
                      Send the integration instructions to your developer:
                    </p>
                    <Button
                      asChild
                      className="bg-primary hover:bg-primary-dark text-white"
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                    >
                      <a
                        href={`mailto:?subject=Chatbot Integration Instructions&body=${encodeURIComponent(
                          `Hello,\n\nPlease add the following code to our website's <head> section:\n\n${integrationCode}\n\nBest regards`,
                        )}`}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Email Instructions
                      </a>
                    </Button>
                  </TabsContent>
                </Tabs>
              </motion.div>

              {/* Test Integration Section */}
              <motion.div variants={slideIn}>
                <h3 className="text-lg font-semibold mb-4">3. Verify Integration</h3>
                <Button
                  onClick={handleTestIntegration}
                  disabled={integrationStatus === "testing"}
                  className="bg-primary hover:bg-primary-dark text-white"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  {integrationStatus === "testing" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Testing Integration...
                    </>
                  ) : (
                    "Test Integration"
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Website Preview Dialog */}
      <Dialog open={showDemoChat} onOpenChange={setShowDemoChat}>
        <DialogContent className="sm:max-w-[90vw] h-[90vh] p-0">
          {/* Feedback Topbar */}
          <motion.div
            className="w-full  bg-primary/5 border-b px-6 py-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between pr-8">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm">Chatbot not working as intended?</span>
              </div>
              <a href="/feedback" className="text-sm text-primary hover:text-primary-dark underline transition-colors">
                Share feedback
              </a>
            </div>
          </motion.div>

          {/* Website Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* Example Website Content */}
            <motion.header className="mb-8 pb-4 border-b" variants={fadeIn} initial="hidden" animate="visible">
              <nav className="flex justify-between items-center">
                <div className="font-bold text-xl text-primary">Company Name</div>
                <div className="space-x-4">
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Products
                  </a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    About
                  </a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </div>
              </nav>
            </motion.header>

            <motion.main variants={staggerChildren} initial="hidden" animate="visible">
              <motion.h1
                variants={fadeIn}
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              >
                Welcome to our website
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-8 ">
                This is how your website will look with the chatbot integration. The chatbot will appear in the bottom
                right corner.
              </motion.p>

              <motion.div variants={staggerChildren} className="grid md:grid-cols-2 gap-8">
                <motion.div variants={slideIn} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-primary">Our Products</h2>
                  <p className="text-muted-foreground sm:text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </p>
                </motion.div>
                <motion.div variants={slideIn} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-primary sm:text-base">About Us</h2>
                  <p className="text-muted-foreground sm:text-base">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </p>
                </motion.div>
              </motion.div>
            </motion.main>
          </div>

          {/* Chatbot Widget */}
          <motion.div
            className="fixed bottom-4 right-4 w-[calc(100%-2rem)] sm:w-80 max-w-[24rem] bg-background rounded-lg shadow-lg border border-primary/20"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="p-3 border-b border-primary/20 flex items-center justify-between bg-primary/5 rounded-t-lg">
              <h3 className="font-semibold text-primary">Chat with us</h3>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark hover:bg-primary/10">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 h-[400px] flex flex-col">
              <motion.div className="flex-1 space-y-4 overflow-y-auto" variants={staggerChildren}>
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      variants={chatBubble}
                      initial="hidden"
                      animate="visible"
                      className={`${
                        message.role === "assistant"
                          ? "bg-muted text-foreground"
                          : "bg-primary text-primary-foreground ml-auto"
                      } p-3 rounded-lg text-sm max-w-[80%]`}
                    >
                      {message.content}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              <div className="border-t border-primary/20 pt-4 mt-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border-primary/20 focus-visible:ring-primary"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-primary hover:bg-primary-dark text-white"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Success/Failure States */}
      <AnimatePresence>
        {integrationStatus === "success" && (
          <Dialog open={true} onOpenChange={() => setIntegrationStatus("idle")}>
            <DialogContent className="sm:max-w-md">
              <motion.div className="text-center space-y-4" variants={scaleIn} initial="hidden" animate="visible">
                <div className="inline-block p-4 rounded-full bg-success/10">
                  <CheckCircle className="w-12 h-12 text-success" />
                </div>
                <h2 className="text-2xl font-bold text-success">Integration Successful!</h2>
                <p className="text-muted-foreground">
                  Your chatbot is now ready to use. What would you like to do next?
                </p>
                <div className="grid gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary-dark text-white"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Explore Admin Panel
                    </a>
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-secondary hover:bg-secondary-dark text-slate-500"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Start talking to your chatbot
                  </Button>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-primary hover:bg-primary/5"
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                    >
                      <Twitter className="h-5 w-5 text-primary" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-primary hover:bg-primary/5"
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                    >
                      <Facebook className="h-5 w-5 text-primary" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-primary hover:bg-primary/5"
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                    >
                      <Linkedin className="h-5 w-5 text-primary" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-primary hover:bg-primary/5"
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                    >
                      <Share2 className="h-5 w-5 text-primary" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}

        {integrationStatus === "failed" && (
          <Dialog open={true} onOpenChange={() => setIntegrationStatus("idle")}>
            <DialogContent className="sm:max-w-md">
              <motion.div className="text-center space-y-4" variants={scaleIn} initial="hidden" animate="visible">
                <div className="inline-block p-4 rounded-full bg-destructive/10">
                  <AlertCircle className="w-12 h-12 text-destructive" />
                </div>
                <h2 className="text-2xl font-bold text-destructive">Integration Not Detected</h2>
                <p className="text-muted-foreground">
                  We couldn't detect the integration on your website. Please make sure you've:
                </p>
                <ul className="text-left text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-medium">1.</span>
                    <span>Added the integration code to your website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">2.</span>
                    <span>Placed the code in the &lt;head&gt; section</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">3.</span>
                    <span>Deployed the changes to your live website</span>
                  </li>
                </ul>
                <div className="grid gap-4">
                  <Button
                    onClick={handleTestIntegration}
                    className="bg-primary hover:bg-primary-dark text-white"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    Test Integration Again
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="border-primary hover:bg-primary/5"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <a href="mailto:support@beyondchats.com">Contact Support</a>
                  </Button>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

