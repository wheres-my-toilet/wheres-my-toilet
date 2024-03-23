import { supabase } from '@/shared/supabase/supabase';

export const findPassword = async ({
  email,
  setEmail,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/',
    });
    console.log(data);
    if (!error) {
      alert('Please check your email');
      setEmail('');
    }
  } catch (error) {
    console.error(error);
  }
};
