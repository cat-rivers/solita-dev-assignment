import React from "react";
import { useState } from "react";
import "./App.css";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import JourneyList from "./JourneyList";
import { Journey } from "./JourneyList";

const defaultQueryParameters = {
  pagesize: 5,
};

const makeQueryParams = (params: Object) => {
  const searchParams = new URLSearchParams();
  for (const [param, value] of Object.entries(params)) {
    searchParams.set(param, value);
  }
  return searchParams.toString();
};

const getJourneys = async (params: Object) => {
  const results = await axios.get(`/journeys?${makeQueryParams(params)}`);

  return results.data;
};

const queryClient = new QueryClient();

function App() {
  const [queryParameters, setQueryParameters] = useState(
    defaultQueryParameters
  );
  // add state for the query parameters
  const query = useQuery<Journey[]>({
    queryKey: [
      "journeys",
      queryParameters,
      // pass in the query parameters here
    ],
    // pass in the query parameters
    queryFn: () => getJourneys(queryParameters),
  });

  // JSON.stringify(query.data, null, 2

  return (
    // add select for setting the page size
    // add arrows left right to paging
    <>
      {query.isLoading ? (
        "loading"
      ) : (
        <JourneyList journeys={query.data || []} />
      )}
    </>
  );
}

const WrapProviders = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default WrapProviders;
