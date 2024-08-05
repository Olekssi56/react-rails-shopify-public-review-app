import {useState, useCallback} from 'react';
import {
  BlockStack,
  Box,
  Card,
  Collapsible,
  InlineGrid,
  InlineStack,
  Page,
  Select,
  Tabs,
  Text,
  TextField,
} from '@shopify/polaris';
import { ChevronDownIcon, ChevronUpIcon } from '@shopify/polaris-icons';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

const tabs = [
  // {
  //   id: 'branding',
  //   content: 'Branding',
  //   accessibilityLabel: 'Branding',
  //   panelID: 'branding',
  // },
  {
    id: 'orders',
    content: 'Orders',
    accessibilityLabel: 'Orders',
    panelID: 'orders',
  },
  {
    id: 'general',
    content: 'General',
    accessibilityLabel: 'General',
    panelID: 'general',
  },
];

const brandingSections = [
  {
    key: "general_appearance",
    heading: "General appearance",
    subheading: "Customize visual elements to fit your brand's look & feel"
  },
  {
    key: "email_appearance",
    heading: "Email appearance",
    subheading: "Customize your email colors and font to match your brand"
  },
];

const generalSections = [
  {
    key: "localization",
    heading: "Localization",
    subheading: "Customize the languages used in widgets and emails"
  },
  {
    key: "email_replies_address",
    heading: "Email replies address",
    subheading: "Customer replies to emails will be sent to this email address"
  },
  {
    key: "email_footer",
    heading: "Email footer",
    subheading: "Display text in the footer of emails",
  },
  {
    key: "email_compliance",
    heading: "Email compliance",
    subheading: "Choose who receives emails, and how to handle unsubscribes",
  },
  // {
  //   key: "transparency",
  //   heading: "Transparency",
  //   subheading: "enables you to automatically display disclosures, in order to comply with any local laws, rules and regulations",
  // },
  {
    key: "reviewers_name_format",
    heading: "Reviewers name format",
    subheading: "Customize how the reviewer name is displayed on widgets",
  },
];


export default function Settings({shop}) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [expanded, setExpanded] = useState({
    manage_new_reviews: false,
  });
  // General Tab
  const languages = [
    {label: 'English', value: 'english'},
  ];
  const [selectedLanugage, setSelectedLanguage] = useState('english');

  const handleTabChange = useCallback(
    (newSelectedTabIndex) => setSelectedTabIndex(newSelectedTabIndex),
    [],
  );

  /* Tabs */
  const brandingTabMarkup = (
    <BlockStack gap="400">
    {
      brandingSections.map((section) => {
        const { key, heading, subheading } = section;

        return (
          <Card key={section.key}>
            <Box>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  return setExpanded((prev) => ({...prev, [key]: !prev[key]}));
                }}
              >
                <InlineStack align='space-between' blockAlign='center'>
                  <BlockStack gap="200">
                    <Text variant="headingMd" as="h2">{heading}</Text>
                    <Text variant="headingSm" as="h3">{subheading}</Text>
                  </BlockStack>
                  {expanded[key] ? (
                    <ChevronUpIcon width="24px" height="24px" />
                  ) : (
                    <ChevronDownIcon width="24px" height="24px" />
                  )}
                </InlineStack>
              </div>
            </Box>
            <Collapsible open={expanded[key]}>
              {key === "manage_new_reviews" && manageNewReviewsMarkup}
              {key === "review_request_timing" && reviewRequestTimingMarkup}
            </Collapsible>
          </Card>
        );
      })
    }
  </BlockStack>
  );

  const ordersTabMarkup = (
    <BlockStack gap="200">
      <InlineGrid columns={3} gap="400">
        <TextField
        />
        <Select
          options={languages}
          onChange={() => {}}
          value={selectedLanugage}
          disabled
        />
        <Select
          options={languages}
          onChange={() => {}}
          value={selectedLanugage}
          disabled
        />
      </InlineGrid>
    </BlockStack>
  );

  const localizationMarkup = (
    <InlineGrid columns={['oneThird', 'twoThirds']} alignItems="center" gap="400">
      <Text>Primary language</Text>
      <Select
        options={languages}
        onChange={() => {}}
        value={selectedLanugage}
        disabled
      />
    </InlineGrid>
  );
  const emailRepliesAddressMarkup = (
    <InlineGrid columns={['oneThird', 'twoThirds']} alignItems="center" gap="400">
      <Text>Send email replies to</Text>
      <TextField
        type="email"
        helpText={`Leave empty to have email replies sent to: ${shop?.customer_email}`}
      />
    </InlineGrid>
  );
  const emailFooterMarkup = (
    <BlockStack gap="200">
      <InlineStack gap="200" blockAlign="center">
        <Toggle
          checked={true}
          className="toggle"
          icons={false}
          disabled={false}
          onChange={(e) => {}}
        />
        <Text>Display Footer</Text>
      </InlineStack>
      <TextField
        label="Footer text"
        value=""
        onChange={() => {}}
        multiline={4}
        autoComplete="off"
      />
    </BlockStack>
  );
  const emailComplianceMarkup = (
    <BlockStack gap="200">
      <InlineGrid columns={['oneThird', 'twoThirds']} alignItems="center" gap="400">
        <Text>Send emails</Text>
        <Select
          options={languages}
          onChange={() => {}}
          value={selectedLanugage}
          disabled
        />
      </InlineGrid>
      <InlineGrid columns={['oneThird', 'twoThirds']} alignItems="center" gap="400">
        <Text>Unsubscribing</Text>
        <Select
          options={languages}
          onChange={() => {}}
          value={selectedLanugage}
          disabled
        />
      </InlineGrid>
    </BlockStack>
  );
  // const transparencyMarkup = (
  //   <></>
  // );
  const reviewersNameFormatMarkup = (
    <InlineGrid columns={['oneThird', 'twoThirds']} alignItems="center" gap="400">
      <Text>Display name</Text>
      <Select
        options={languages}
        onChange={() => {}}
        value={selectedLanugage}
        disabled
      />
    </InlineGrid>
  );
  const generalTabMarkup = (
    <BlockStack gap="400">
      {
        generalSections.map((section) => {
          const { key, heading, subheading } = section;
  
          return (
            <Card key={section.key}>
              <Box>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    return setExpanded((prev) => ({...prev, [key]: !prev[key]}));
                  }}
                >
                  <InlineStack align='space-between' blockAlign='center'>
                    <BlockStack gap="200">
                      <Text variant="headingMd" as="h2">{heading}</Text>
                      <Text variant="headingSm" as="h3">{subheading}</Text>
                    </BlockStack>
                    {expanded[key] ? (
                      <ChevronUpIcon width="24px" height="24px" />
                    ) : (
                      <ChevronDownIcon width="24px" height="24px" />
                    )}
                  </InlineStack>
                </div>
              </Box>
              <Collapsible open={expanded[key]}>
                <Box paddingBlockStart={400}>
                  {key === "localization" && localizationMarkup}
                  {key === "email_replies_address" && emailRepliesAddressMarkup}
                  {key === "email_footer" && emailFooterMarkup}
                  {key === "email_compliance" && emailComplianceMarkup}
                  {/* {key === "transparency" && transparencyMarkup} */}
                  {key === "reviewers_name_format" && reviewersNameFormatMarkup}
                </Box>
              </Collapsible>
            </Card>
          );
        })
      }
    </BlockStack>
  );

  return (
    <Page title="Settings" fullWidth>
      <Card>
        <Tabs tabs={tabs} selected={selectedTabIndex} onSelect={handleTabChange}>
          {/* {selectedTabIndex === 0 && brandingTabMarkup} */}
          {selectedTabIndex === 0 && ordersTabMarkup}
          {selectedTabIndex === 1 && generalTabMarkup}
        </Tabs>
      </Card>
    </Page>
  );
}