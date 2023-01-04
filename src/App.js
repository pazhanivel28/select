import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./App.css";

function App() {
  const [slugValueOptions, setSlugValuesOptions] = useState([]);
  const [vbNameValueOptions, setVbNameValueOptions] = useState([]);
  const [bNameValueOptions, setBNameValueOptions] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [slugValue, setSlugValue] = useState([]);
  const [vbValue, setVbValue] = useState([]);
  const [bValue, setBValue] = useState([]);
  const [values, setValues] = useState([]);
  const fetchData = async () => {
    const response = await fetch(
      "https://us-central1-arboreal-vision-339901.cloudfunctions.net/get_filter_values"
    );
    return response.json();
  };

  function defaultValue() {
    if (values.data !== undefined) {
      const slug = values.data.map((rest) => {
        return { label: rest.slug, value: rest.slug };
      });
      const vb_value = values.data.map((rest) => {
        return { label: rest.vb_name, value: rest.vb_name };
      });
      const b_Value = values.data.map((rest) => {
        return { label: rest.b_name, value: rest.b_name };
      });
      setSlugValuesOptions(slug);
      setBNameValueOptions(removeDuplication(b_Value));
      setVbNameValueOptions(removeDuplication(vb_value));
      setTableData(values);
    }
  }

  useEffect(() => {
    fetchData().then((res) => {
      setValues(res);
      setTableData(res);
    });
  }, []);

  useEffect(() => {
    defaultValue();
  }, [values]);

  useEffect(() => {
    if (slugValue.length) {
      let filterVbValue = [];
      if (!vbValue.length && !bValue.length) {
        filterVbValue = values.data.filter((rest) =>
          slugValue.map((e) => e.value).includes(rest.slug)
        );
      } else if (vbValue.length && !bValue.length) {
        filterVbValue = values.data.filter(
          (rest) =>
            slugValue.map((e) => e.value).includes(rest.slug) &&
            vbValue.map((e) => e.value).includes(rest.vb_name)
        );
      } else if (!vbValue.length && bValue.length) {
        filterVbValue = values.data.filter(
          (rest) =>
            slugValue.map((e) => e.value).includes(rest.slug) &&
            bValue.map((e) => e.value).includes(rest.b_name)
        );
      } else if (vbValue.length && bValue.length) {
        filterVbValue = values.data.filter(
          (rest) =>
            slugValue.map((e) => e.value).includes(rest.slug) &&
            bValue.map((e) => e.value).includes(rest.b_name) &&
            vbValue.map((e) => e.value).includes(rest.vb_name)
        );
      }
      const vb_value = filterVbValue.map((rest) => {
        return { label: rest.vb_name, value: rest.vb_name };
      });

      const b_Value = filterVbValue.map((rest) => {
        return { label: rest.b_name, value: rest.b_name };
      });

      setBNameValueOptions(removeDuplication(b_Value));
      setVbNameValueOptions(removeDuplication(vb_value));
      setTableData(filterVbValue);
    } else {
      let filterVbValue = [];
      if (!vbValue.length && !bValue.length) {
        defaultValue();
      } else if (vbValue.length && !bValue.length) {
        filterVbValue = values.data.filter((rest) =>
          vbValue.map((e) => e.value).includes(rest.vb_name)
        );
        const b_Value = filterVbValue.map((rest) => {
          return { label: rest.b_name, value: rest.b_name };
        });
        setBNameValueOptions(removeDuplication(b_Value));
        setTableData(filterVbValue);
      } else if (!vbValue.length && bValue.length) {
        filterVbValue = values.data.filter((rest) =>
          bValue.map((e) => e.value).includes(rest.b_name)
        );
        const vb_value = filterVbValue.map((rest) => {
          return { label: rest.vb_name, value: rest.vb_name };
        });
        setVbNameValueOptions(removeDuplication(vb_value));
        setTableData(filterVbValue);
      } else if (vbValue.length && bValue.length) {
        filterVbValue = values.data.filter(
          (rest) =>
            bValue.map((e) => e.value).includes(rest.b_name) &&
            vbValue.map((e) => e.value).includes(rest.vb_name)
        );
        const slug = filterVbValue.map((rest) => {
          return { label: rest.slug, value: rest.slug };
        });
        setSlugValuesOptions(slug);
        setTableData(filterVbValue);
      }
    }
  }, [slugValue]);

  useEffect(() => {
    if (vbValue.length) {
      let filterVbValue = [];
      if (!slugValue.length && !bValue.length) {
        filterVbValue = values.data.filter((rest) =>
          vbValue.map((e) => e.value).includes(rest.vb_name)
        );
      } else if (slugValue.length && !bValue.length) {
        filterVbValue = values.data.filter(
          (rest) =>
            vbValue.map((e) => e.value).includes(rest.vb_name) &&
            slugValue.map((e) => e.value).includes(rest.slug)
        );
      } else if (!slugValue.length && bValue.length) {
        filterVbValue = values.data.filter(
          (rest) =>
            vbValue.map((e) => e.value).includes(rest.vb_name) &&
            bValue.map((e) => e.value).includes(rest.b_name)
        );
      } else if (slugValue.length && bValue.length) {
        filterVbValue = values.data.filter(
          (rest) =>
            slugValue.map((e) => e.value).includes(rest.slug) &&
            bValue.map((e) => e.value).includes(rest.b_name) &&
            vbValue.map((e) => e.value).includes(rest.vb_name)
        );
      }

      const slug = filterVbValue.map((rest) => {
        return { label: rest.slug, value: rest.slug };
      });

      const b_Value = filterVbValue.map((rest) => {
        return { label: rest.b_name, value: rest.b_name };
      });

      setSlugValuesOptions(slug);
      setBNameValueOptions(removeDuplication(b_Value));
      setTableData(filterVbValue);
    } else {
      let filterVbValue = [];
      if (!slugValue.length && !bValue.length) {
        defaultValue();
      } else if (slugValue.length && !bValue.length) {
        filterVbValue = values.data.filter((rest) =>
          slugValue.map((e) => e.value).includes(rest.slug)
        );
        const b_Value = filterVbValue.map((rest) => {
          return { label: rest.b_name, value: rest.b_name };
        });
        setBNameValueOptions(removeDuplication(b_Value));
        setTableData(filterVbValue);
      } else if (!slugValue.length && bValue.length) {
        filterVbValue = values.data.filter((rest) =>
          bValue.map((e) => e.value).includes(rest.b_name)
        );
        const slug = filterVbValue.map((rest) => {
          return { label: rest.slug, value: rest.slug };
        });
        setSlugValuesOptions(slug);
        setTableData(filterVbValue);
      } else if (slugValue.length && bValue.length) {
        filterVbValue = values.data.filter(
          (rest) =>
            bValue.map((e) => e.value).includes(rest.b_name) &&
            slugValue.map((e) => e.value).includes(rest.slug)
        );
        const vb_value = filterVbValue.map((rest) => {
          return { label: rest.vb_name, value: rest.vb_name };
        });
        setVbNameValueOptions(removeDuplication(vb_value));
        setTableData(filterVbValue);
      }
    }
  }, [vbValue]);

  useEffect(() => {
    if (bValue.length) {
      let filterVbValue = [];
      if (!slugValue.length && !vbValue.length) {
        filterVbValue = values.data.filter((rest) =>
          bValue.map((e) => e.value).includes(rest.b_name)
        );
      } else if (slugValue.length && !vbValue.length) {
        filterVbValue = values.data.filter(
          (rest) =>
            bValue.map((e) => e.value).includes(rest.b_name) &&
            slugValue.map((e) => e.value).includes(rest.slug)
        );
      } else if (!slugValue.length && vbValue.length) {
        filterVbValue = values.data.filter(
          (rest) =>
            vbValue.map((e) => e.value).includes(rest.vb_name) &&
            bValue.map((e) => e.value).includes(rest.b_name)
        );
      } else if (slugValue.length && bValue.length) {
        filterVbValue = values.data.filter(
          (rest) =>
            slugValue.map((e) => e.value).includes(rest.slug) &&
            bValue.map((e) => e.value).includes(rest.b_name) &&
            vbValue.map((e) => e.value).includes(rest.vb_name)
        );
      }
      const slug = filterVbValue.map((rest) => {
        return { label: rest.slug, value: rest.slug };
      });
      const vb_value = filterVbValue.map((rest) => {
        return { label: rest.vb_name, value: rest.vb_name };
      });

      setSlugValuesOptions(slug);
      setVbNameValueOptions(removeDuplication(vb_value));
      setTableData(filterVbValue);
    } else {
      let filterVbValue = [];
      if (!slugValue.length && !vbValue.length) {
        defaultValue();
      } else if (slugValue.length && !vbValue.length) {
        filterVbValue = values.data.filter((rest) =>
          slugValue.map((e) => e.value).includes(rest.slug)
        );
        const vb_value = filterVbValue.map((rest) => {
          return { label: rest.vb_name, value: rest.vb_name };
        });
        setVbNameValueOptions(removeDuplication(vb_value));
        setTableData(filterVbValue);
      } else if (!slugValue.length && vbValue.length) {
        filterVbValue = values.data.filter((rest) =>
          vbValue.map((e) => e.value).includes(rest.vb_name)
        );
        const slug = filterVbValue.map((rest) => {
          return { label: rest.slug, value: rest.slug };
        });
        setSlugValuesOptions(slug);
        setTableData(filterVbValue);
      } else if (slugValue.length && vbValue.length) {
        filterVbValue = values.data.filter(
          (rest) =>
            vbValue.map((e) => e.value).includes(rest.vb_name) &&
            slugValue.map((e) => e.value).includes(rest.slug)
        );
        const b_Value = filterVbValue.map((rest) => {
          return { label: rest.b_name, value: rest.b_name };
        });

        setBNameValueOptions(removeDuplication(b_Value));
        setTableData(filterVbValue);
      }
    }
  }, [bValue]);

  function removeDuplication(array) {
    const uniqueIds = [];
    const unique = array.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.value);
      if (!isDuplicate) {
        uniqueIds.push(element.value);
        return true;
      }
      return false;
    });
    return unique;
  }

  const headers = [
    {
      si: "SI",
      slug: "SLUG",
      b_name: "B_NAME",
      vb_name: "VB_NAME",
    },
  ];

  return (
    <div className="App">
      <div className="Dropdown_container">
        <div className="selector">
          Slug
          <Select
            isMulti
            value={slugValue}
            name="slug"
            options={slugValueOptions}
            onChange={(data) => setSlugValue(data)}
          />
        </div>
        <div className="selector">
          vb Name
          <Select
            isMulti
            value={vbValue}
            name="vb_name"
            options={vbNameValueOptions}
            onChange={(data) => setVbValue(data)}
          />
        </div>
        <div className="selector">
          b Name
          <Select
            isMulti
            value={bValue}
            name="b_name"
            options={bNameValueOptions}
            onChange={(data) => setBValue(data)}
          />
        </div>
      </div>

      <table>
        <thead>
          {!!tableData.length &&
            headers.map((header) => {
              return (
                <tr className="table_header">
                  <th className="table_header_value">{header.si}</th>
                  <th className="table_header_value">{header.slug}</th>
                  <th className="table_header_value">{header.b_name}</th>
                  <th className="table_header_value">{header.vb_name}</th>
                </tr>
              );
            })}
        </thead>
        <div className="table_body">
          {!!tableData.length &&
            tableData.map((data, index) => {
              return (
                <tr className="table_data" key={index}>
                  <td className="table_data_value">{index + 1}</td>
                  <td className="table_data_value">{data.slug}</td>
                  <td className="table_data_value">{data.b_name}</td>
                  <td className="table_data_value">{data.vb_name}</td>
                </tr>
              );
            })}
        </div>
      </table>
    </div>
  );
}

export default App;
