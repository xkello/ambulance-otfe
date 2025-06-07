# x-hospital-list



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute     | Description | Type     | Default     |
| ------------------------- | ------------- | ----------- | -------- | ----------- |
| `apiBase`                 | `api-base`    |             | `string` | `undefined` |
| `hospitalId` _(required)_ | `hospital-id` |             | `string` | `undefined` |


## Events

| Event           | Description | Type                  |
| --------------- | ----------- | --------------------- |
| `entry-clicked` |             | `CustomEvent<string>` |


## Methods

### `reload() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [x-hospital-app](../x-hospital-app)

### Graph
```mermaid
graph TD;
  x-hospital-app --> x-hospital-list
  style x-hospital-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
