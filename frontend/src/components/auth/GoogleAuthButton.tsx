import { useState } from 'react';
import { LogIn, Loader2 } from 'lucide-react';
import { getAuthUrl, exchangeCodeForTokens, storeTokens } from '../../services/authService';
import toast from 'react-hot-toast';

interface GoogleAuthButtonProps {
  onAuthSuccess?: () => void;
}

export function GoogleAuthButton({ onAuthSuccess }: GoogleAuthButtonProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuth = async () => {
    try {
      setIsAuthenticating(true);
      
      // Get authorization URL from backend
      const authUrl = await getAuthUrl();
      
      // Redirect to OAuth (simpler than popup for backend callback)
      window.location.href = authUrl;
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
      setIsAuthenticating(false);
    }
  };

  return (
    <button
      onClick={handleAuth}
      disabled={isAuthenticating}
      className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[rgba(107,77,124,0.2)] text-[#6B4D7C] rounded-full hover:bg-[rgba(107,77,124,0.05)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isAuthenticating ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Authenticating...</span>
        </>
      ) : (
        <>
          <LogIn className="w-5 h-5" />
          <span>Connect Google Account</span>
        </>
      )}
    </button>
  );
}

