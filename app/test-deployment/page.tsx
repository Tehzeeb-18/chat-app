export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function TestDeploymentPage() {
  const timestamp = new Date().toISOString();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-2xl w-full space-y-6 bg-card p-8 rounded-lg border">
        <h1 className="text-3xl font-bold">✅ Deployment Test</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="font-semibold text-green-600">Deployment is LIVE!</p>
            <p className="text-sm text-muted-foreground mt-1">
              Generated at: {timestamp}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Available Features:</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>✅ Forgot Password</li>
              <li>✅ Reset Password</li>
              <li>✅ Delete Account</li>
              <li>✅ Profile Pictures</li>
              <li>✅ Real-time Messaging</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Test Links:</h2>
            <div className="flex flex-col gap-2">
              <a 
                href="/login" 
                className="text-primary hover:underline"
              >
                → Go to Login Page
              </a>
              <a 
                href="/forgot-password" 
                className="text-primary hover:underline"
              >
                → Go to Forgot Password
              </a>
              <a 
                href="/register" 
                className="text-primary hover:underline"
              >
                → Go to Register
              </a>
            </div>
          </div>

          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="font-semibold text-yellow-600">Still seeing old version?</p>
            <p className="text-sm mt-2">Clear your browser cache:</p>
            <ul className="text-sm list-disc list-inside mt-1">
              <li>Windows/Linux: Ctrl + Shift + R</li>
              <li>Mac: Cmd + Shift + R</li>
              <li>Or use Incognito/Private mode</li>
            </ul>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Latest commit: ff41281</p>
            <p>This page is never cached (force-dynamic)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
