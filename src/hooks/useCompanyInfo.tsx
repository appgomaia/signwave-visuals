import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CompanyInfo {
  id: string;
  company_name: string;
  company_email: string | null;
  company_phone: string | null;
  company_address: string | null;
  company_website: string | null;
  company_logo_url: string | null;
  tax_id: string | null;
  registration_number: string | null;
  invoice_terms: string | null;
  invoice_footer: string | null;
}

export const useCompanyInfo = () => {
  return useQuery({
    queryKey: ['company-info'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('company_info')
        .select('*')
        .single();

      if (error) throw error;
      return data as CompanyInfo;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
