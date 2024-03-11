import Tabs from './Sample'

const tabs = [
  {
    id: 'tab1',
    label: 'Tab 1',
    content: <p>Content for Tab 1</p>,
  },
  {
    id: 'tab2',
    label: 'Tab 2',
    content: <p>Content for Tab 2</p>,
  },
  {
    id: 'tab3',
    label: 'Tab 3',
    content: <p>Content for Tab 3</p>,
  },
];

const IndexPage = () => {
  return <Tabs tabs={tabs} />;
};

export default IndexPage;