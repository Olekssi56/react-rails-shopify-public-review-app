import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Loading, NavigationMenu } from "@shopify/app-bridge-react";
import { isEmpty } from "lodash";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";
import { getShop } from "../../apis";
import Routes from "../../Routes";

export function CustomProvider({ pages }) {
  const { t } = useTranslation();
  const fetch = useAuthenticatedFetch();
  const [isLoading, setIsLoading] = useState(true);
  const [shop, setShop] = useState({});

  const { data, refetch } = useAppQuery({
    url: `/api/shop`,
    reactQueryOptions: {
      onSuccess: () => {
        if (data !== undefined) {
          setShop(data);
          setIsLoading(false);
        } else {
          refetch();
        }
      },
    },
  });

  const refetchShop = async () => {
    const response = await getShop(fetch);
    if (response.ok) {
      const data = await response.json();
      setShop(data);
      setIsLoading(false);
    } else {
    }
  };

  const requireSubscription = isEmpty(shop?.subscription);

  const navigationMenuMarkup = (
    <NavigationMenu
      navigationLinks={[
        {
          label: t("NavigationMenu.reviews"),
          destination: "/reviews",
        },
        {
          label: t("NavigationMenu.settings"),
          destination: "/settings",
        },
        {
          label: t("NavigationMenu.plans"),
          destination: "/plans",
        },
      ]}
    />
  );

  return (
    <>
      {
        isLoading ? (
          <Loading />
        ) : (
          <>
            {!requireSubscription && navigationMenuMarkup}
            <Routes
              pages={pages}
              refetchShop={refetchShop}
              isLoading={isLoading}
              shop={shop}
            />
          </>
        )
      }
    </>
  );
}
