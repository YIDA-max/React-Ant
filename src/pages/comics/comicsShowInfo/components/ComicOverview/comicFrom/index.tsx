import { ProCard, ProForm, ProFormRadio, ProFormSelect } from '@ant-design/pro-components';
import { FromInfo } from './config/index';
export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Index: React.FC = () => {
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <ProCard title="筛选" collapsible>
        {' '}
        <ProForm
          name="validate_other"
          initialValues={{
            area: '',
            tags: '',
            audience: '',
            year: '',
            letter: '',
            status: '',
            sort: 'index.html',
          }}
          onValuesChange={(_, values) => {
            console.log(values);
          }}
          submitter={{
            searchConfig: {
              resetText: '重置',
              submitText: '查询',
            },
            render: (_, dom) => dom.reverse(),
          }}
          onFinish={async (value) => console.log(value)}
          layout="horizontal" // 可选 "horizontal" (默认)、"vertical"、"inline"
          labelAlign="left" // 可选 "left"、"right"、"center" (默认)
        >
          {FromInfo.map((item) => {
            if (item.options.length > 10) {
              return (
                <ProFormSelect
                  name={item.name}
                  label={item.label}
                  key={item.name}
                  options={item.options}
                  showSearch
                  wrapperCol={{ span: 10 }}
                />
              );
            } else {
              return (
                <ProFormRadio.Group
                  name={item.name}
                  label={item.label}
                  options={item.options}
                  key={item.name}
                />
              );
            }
          })}
        </ProForm>
      </ProCard>
    </div>
  );
};

export default Index;
