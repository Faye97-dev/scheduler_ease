import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  REACT_QUERY_RETRY,
  REACT_QUERY_STALE_TIME,
  REFECH_ON_WINDOW_FOCUS,
} from "@/config";
import client, { IClientApiParams } from "@/lib/api-client";
import { urlQueryParamsBuilder } from "@/lib/utils";
import { Alert } from "react-native";

export type QueryParams = { [key: string]: number | string };
export type RequestData<T> = {
  url: string;
  method: IClientApiParams<any>["method"];
  urlHasQueryParams?: boolean;
  queryParams?: QueryParams;
  body?: T;
  isExternalApi?: boolean;
  token?: string;
};

const queryFn = <ApiPayload, ApiResponse>(
  requestData: RequestData<ApiPayload>
) => {
  const { url, method } = requestData;
  const urlHasQueryParams = requestData?.urlHasQueryParams || false;
  const queryParams = requestData?.queryParams || null;
  const body = requestData?.body;

  const args: IClientApiParams<ApiPayload> = {
    endpoint: urlQueryParamsBuilder(url, queryParams, urlHasQueryParams),
    method,
    body,
  };

  if (requestData?.isExternalApi !== undefined)
    args.isExternalApi = requestData?.isExternalApi;
  if (requestData?.token !== undefined) args.token = requestData?.token;

  return client<ApiPayload, ApiResponse>(args);
};

export function useGenericQuery<ApiPayload, ApiResponse>({
  requestData,
  queryKey,
  queryOptions = {},
}: {
  requestData: RequestData<ApiPayload>;
  queryKey: string;
  queryOptions?: Omit<
    UseQueryOptions<ApiResponse, unknown>,
    "queryKey" | "queryFn"
  >;
}) {
  return useQuery({
    queryKey: [queryKey, { ...requestData?.queryParams, ...requestData?.body }],
    queryFn: () => queryFn<ApiPayload, ApiResponse>(requestData),
    retry: REACT_QUERY_RETRY,
    staleTime: REACT_QUERY_STALE_TIME,
    refetchOnWindowFocus: REFECH_ON_WINDOW_FOCUS,
  });
}

export function useGenericMutation<ApiPayload, ApiResponse>() {
  return useMutation({
    mutationFn: (requestData: RequestData<ApiPayload>) =>
      queryFn<ApiPayload, ApiResponse>(requestData),
    onError: (error) => {
      console.log("error", error);
      Alert.alert("Error, something go wrong please try again later.");
    },
  });
}
