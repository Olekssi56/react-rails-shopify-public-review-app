import { useState } from "react";
import {
  Button,
  BlockStack,
  Card,
  Divider,
  Grid,
  Layout,
  List,
  Page,
  ProgressBar,
  Text,
} from "@shopify/polaris";
import {
  TitleBar,
  useNavigate
} from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import { isEmpty } from "lodash";
import {
  Welcome,
  ProductReviewsWidget,
  RatingWidget,
  StorePrimaryLanguage,
  LayoutCustomization,
  AskReviews,
  Ready
} from "../components";

const ONBOARDING_STEP = 7;

export default function Onboarding({
  subscription
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(3);

  const onboardingMarkup = (
    <>
      { step === 1 && <Welcome /> }
      { step === 2 && <ProductReviewsWidget /> }
      { step === 3 && <RatingWidget /> }
      { step === 4 && <StorePrimaryLanguage /> }
      { step === 5 && <LayoutCustomization /> }
      { step === 6 && <AskReviews /> }
      { step === 7 && <Ready /> }
    </>
  );

  const handleContinue = () => {
    setStep(step + 1);
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="200">
              {onboardingMarkup}
              {
                step !== ONBOARDING_STEP &&
                  <BlockStack gap="200" align="center" inlineAlign="center">
                    <ProgressBar
                      progress={(step / ONBOARDING_STEP) * 100}
                      size='small'
                      tone='primary'
                      animated
                    />
                    <Button variant="primary" size="large" onClick={handleContinue}>Continue</Button>
                  </BlockStack>
              }
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
