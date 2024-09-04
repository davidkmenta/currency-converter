import {createRoot} from "react-dom/client";
import React from "react";
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import CurrencyConverter from "./components/CurrencyConverter";
import {QueryClient} from "@tanstack/react-query";
import {createSyncStoragePersister} from "@tanstack/query-sync-storage-persister";

const cnbQueryClient = new QueryClient();
const cnbDataPersister = createSyncStoragePersister({
    storage: window.localStorage,
});

document.body.innerHTML = '<div id="app" class="container mx-auto py-5"></div>';

createRoot(document.getElementById('app') as HTMLElement).render(
    <React.StrictMode>
        <PersistQueryClientProvider client={cnbQueryClient} persistOptions={{persister: cnbDataPersister}}>
            <CurrencyConverter/>
        </PersistQueryClientProvider>
    </React.StrictMode>
);
