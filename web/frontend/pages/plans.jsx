import { useState } from "react";
import {
  BlockStack,
  Card,
  InlineStack,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
} from "@shopify/polaris";
import {
  Loading,
  Toast,
  useAppBridge,
} from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { groupBy } from "lodash";
import { createSubscription } from "../apis";
import { PricingCard } from "../components";
import {
  useAuthenticatedFetch
} from "../hooks";

export default function Plans({
  refetchShop,
  isLoading,
  shop
}) {
  const plans = groupBy(shop.plans, 'interval') || [];
  const planInterval = 'month';
  const fetch = useAuthenticatedFetch();
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  // Toast
  const emptyToastProps = { content: null };
  const [toastProps, setToastProps] = useState(emptyToastProps);

  const handleSelectPlan = async (planId) => {
    setSelectedPlanId(planId);
    const response = await createSubscription(fetch, { plan_id: planId });
    if (response.ok) {
      const data = await response.json();
      if (data?.confirmation_url) {
        redirect.dispatch(Redirect.Action.REMOTE, data.confirmation_url);
      } else {
        refetchShop().then(() => {
          redirect.dispatch(Redirect.Action.APP, '/onboarding');
        });
      }
    } else {
      setToastProps({
        content: "There was an error creating subscription",
        error: true,
      });
      setSelectedPlanId(null);
    }
  };

  const loadingComponent = isLoading ? <Loading /> : null;

  const toastMarkup = toastProps.content && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const pageSkeletonMarkup = (
    <div
      style={{
        width: "18rem",
        boxShadow: "",
        borderRadius: ".75rem",
        position: "relative",
        zIndex: "0",
      }}
    >
    <Card>
      <BlockStack gap="200">
        <SkeletonDisplayText />
        <SkeletonBodyText lines={1} />
        <SkeletonDisplayText />
        <SkeletonBodyText lines={4} />
        <SkeletonDisplayText />
      </BlockStack>
    </Card>
    </div>
  );

  const pageSkeleton = (
    <SkeletonPage fullWidth>
      <InlineStack gap="600" align="center" blockAlign="start">
        { pageSkeletonMarkup }
        { pageSkeletonMarkup }
      </InlineStack>
    </SkeletonPage>
  );

  const pageMarkup = (
    <Page fullWidth>
      <InlineStack gap="600" align="center" blockAlign="start">
        {(plans[planInterval] || []).map((plan, key) => {
          const {id, description, active_features, interval, name, note, price, recommended, trial_days} = plan;
          const isCurrentPlan = shop?.subscription?.plan?.id == id;

          return (
            <PricingCard
              key={key}
              title={name}
              featuredText={recommended ? "Most Popular" : ""}
              description={description}
              features={active_features}
              price={'$' + price}
              frequency={interval}
              active={isCurrentPlan}
              button={{
                content: isCurrentPlan ? "Current" : "Select Plan",
                props: {
                  variant: "primary",
                  disabled: isCurrentPlan,
                  onClick: () => handleSelectPlan(id),
                },
              }}
            />
          );
        })}
      </InlineStack>
    </Page>
  );

  return (
    <>
      {loadingComponent}
      {isLoading ? pageSkeleton : pageMarkup}
    </>
  );
};
