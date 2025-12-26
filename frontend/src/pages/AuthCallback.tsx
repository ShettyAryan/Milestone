import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { exchangeCodeForTokens, storeTokens } from '../services/authService';
import toast from 'react-hot-toast';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  useEffect(() => {
    const handleCallback = async () => {
      // Check if tokens are in URL (from backend redirect)
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const expiryDate = searchParams.get('expiry_date');

      if (accessToken) {
        // Direct token from backend redirect
        const tokens = {
          access_token: accessToken,
          refresh_token: refreshToken || undefined,
          expiry_date: expiryDate ? parseInt(expiryDate, 10) : undefined
        };
        storeTokens(tokens);
        toast.success('Successfully authenticated with Google!');
        setTimeout(() => navigate('/book-appointment'), 1500);
        return;
      }

      // Fallback to code exchange (if using popup method)
      if (error) {
        toast.error('Authentication failed. Please try again.');
        setTimeout(() => navigate('/book-appointment'), 2000);
        return;
      }

      if (code) {
        try {
          const tokens = await exchangeCodeForTokens(code);
          storeTokens(tokens);
          toast.success('Successfully authenticated with Google!');
          setTimeout(() => navigate('/book-appointment'), 1500);
        } catch (error) {
          console.error('Error exchanging code for tokens:', error);
          toast.error('Failed to complete authentication. Please try again.');
          setTimeout(() => navigate('/book-appointment'), 2000);
        }
      } else {
        toast.error('No authorization code received.');
        setTimeout(() => navigate('/book-appointment'), 2000);
      }
    };

    handleCallback();
  }, [code, error, navigate, searchParams]);

  return (
    <div className="min-h-screen bg-[#FFF8F9] flex items-center justify-center px-4">
      <div className="text-center">
        {error ? (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl text-[#3a3a3a] mb-2">Authentication Failed</h2>
            <p className="text-[#7a7a7a]">Redirecting to booking page...</p>
          </>
        ) : code ? (
          <>
            <Loader2 className="w-16 h-16 text-[#6B4D7C] mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl text-[#3a3a3a] mb-2">Completing Authentication...</h2>
            <p className="text-[#7a7a7a]">Please wait while we set up your account.</p>
          </>
        ) : (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl text-[#3a3a3a] mb-2">Authentication Complete</h2>
            <p className="text-[#7a7a7a]">Redirecting to booking page...</p>
          </>
        )}
      </div>
    </div>
  );
}

