import { supabase } from '@/shared/supabase/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const logout = async () => {
  let { error } = await supabase.auth.signOut();
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  return logoutMutation;
};
