import { useQuery } from "@tanstack/react-query";
import * as networkService from "@/services/networkService";
import { queryKeys } from "@/lib/queryKeys";

export function useNetworks() {
  return useQuery({
    queryKey: queryKeys.networks.all,
    queryFn: networkService.getAll,
  });
}
