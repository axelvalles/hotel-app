import { localstorageKeys } from "@/constants";
import { AuthState, authInitialState } from "./auth.init";
import { createLocalStoragePreloader } from "@/utils/helper";

export const authPreloadState = createLocalStoragePreloader<AuthState>(
  localstorageKeys.auth,
  authInitialState
);
