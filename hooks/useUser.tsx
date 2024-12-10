"use client"

import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as userSupaUser } from "@supabase/auth-helpers-react";
import { useState, useEffect, createContext, useContext } from "react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propsName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
  const user = userSupaUser();
  const accessToken = session?.access_token ?? null;

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = async () => {
    return supabase
      .from("users")
      .select("*,price(*,products(*))")
      .in("status", ["trialing", "active"])
      .single();
  };

  const getSubscription = async () => {
    return supabase
      .from("subscriptions")
      .select("*")
      .in("status", ["trialing", "active"])
      .single();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user && !isLoadingData && !userDetails && !subscription) {
        setIsLoadingData(true);

        const results = await Promise.allSettled([getUserDetails(), getSubscription()]);

        const userDetailsPromise = results[0];
        const subscriptionPromise = results[1];

        if (userDetailsPromise.status === "fulfilled") {
          setUserDetails(userDetailsPromise.value.data as UserDetails);
        }

        if (subscriptionPromise.status === "fulfilled") {
          setSubscription(subscriptionPromise.value.data as Subscription);
        }

        setIsLoadingData(false);
      } else if (!user && !isLoadingUser && !isLoadingData) {
        setUserDetails(null);
        setSubscription(null);
      }
    };

    fetchData();
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }
  return context;
};
