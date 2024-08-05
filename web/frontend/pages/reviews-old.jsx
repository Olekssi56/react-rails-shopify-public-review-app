import { useState, useCallback } from 'react';
import { BlockStack, Box, Card, Collapsible, InlineStack, Page, Tabs, Text } from '@shopify/polaris';
import { ChevronDownIcon, ChevronUpIcon } from '@shopify/polaris-icons';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

const titles = {
  manage_new_reviews: {
    heading: "Managing new reviews",
    subheading: "Choose which reviews you want to auto publish and how you want to be notified of new reviews"
  },
  review_request_timing: {
    heading: "Review request timing",
    subheading: "Set the timing of the first review request email sent to your customers"
  },
};

export default function Reviews({}) {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'collect',
      content: 'Collect',
      accessibilityLabel: 'Collect',
      panelID: 'collect',
    },
    {
      id: 'display',
      content: 'Display',
      accessibilityLabel: 'Display',
      panelID: 'display',
    },
    {
      id: 'repeat-customers-1',
      content: 'Manage',
      accessibilityLabel: 'Manage',
      panelID: 'manage',
    },
    {
      id: 'import',
      content: 'Import',
      accessibilityLabel: 'Import',
      panelID: 'import',
    },
  ];

  const [expanded, setExpanded] = useState({
    manage_new_reviews: false,
  });

  const manageNewReviewsMarkup = (
    <Card>
      <Box>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            return setExpanded((prev) => ({...prev, manage_new_reviews: !prev.manage_new_reviews}));
          }}
        >
          <InlineStack align='space-between' blockAlign='center'>
            <BlockStack gap="200">
              <Text variant="headingMd" as="h2">{titles.manage_new_reviews.heading}</Text>
              <Text variant="headingSm" as="h3">{titles.manage_new_reviews.subheading}</Text>
            </BlockStack>
            {expanded.manage_new_reviews ? (
              <ChevronUpIcon width="24px" height="24px" />
            ) : (
              <ChevronDownIcon width="24px" height="24px" />
            )}
          </InlineStack>
        </div>
      </Box>
      <Collapsible open={expanded.manage_new_reviews}>
        <Box paddingBlockStart={400}>
          <BlockStack gap="200">
            <InlineStack>
              <InlineStack gap="100">
                <Toggle
                  checked={true}
                  className="toggle"
                  icons={false}
                  disabled={false}
                  onChange={(e) => {}}
                />
                <Text>Auto-publish new reviews</Text>
              </InlineStack>
            </InlineStack>
            <InlineStack>
              
            </InlineStack>
            <InlineStack>
              
            </InlineStack>
          </BlockStack>
        </Box>
      </Collapsible>
    </Card>
  );

  const reviewRequestTimingMarkup = (
    <Card>
      <InlineStack align='space-between' blockAlign='center'>
        <Text variant='headingMd' as='p'>Review request timing</Text>
        <ChevronDownIcon width="24px" height="24px" />
      </InlineStack>
    </Card>
  );

  return (
    <Page title="Reviews" fullWidth>
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <BlockStack gap="400">
            {manageNewReviewsMarkup}
            {reviewRequestTimingMarkup}
          </BlockStack>
        </Tabs>
      </Card>
    </Page>
  );
}