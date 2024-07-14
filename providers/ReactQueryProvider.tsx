import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function ReactQueryProvider(props: React.PropsWithChildren) {
    <QueryClientProvider client={queryClient}>
        {props.children}
    </QueryClientProvider>
}