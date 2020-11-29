# IOT-DATA-PARSE

![npm-v1.0.1](https://img.shields.io/badge/npm-v1.0.1-brightgreen)

## CopyRight

@2019-2020 Oscura, All Rights Reserved

## How to get

```
npm install @oscura/iot-data-parse
```

## Description

Now, it is a demo.

## Target

For general data analysis of Internet of Things.

## Example

When the data uploaded by the device is as below.

```
{
	"status": true,
	"temperature": 126,
	"time": "1606630210",
}
```

The useful data is just like

```
true
126
1606630210
```

and "status","temperature","time" are useless and waste bandwidth. So we can convert the data as

```
true => 01
126 => 7E
1606630210 => 5F C3 3B 42

= 01 7E 5F C3 3B 42
```

At last, the data we need is "01 7E 5F C3 3B 42", when we get it, we can parse it out according to the rules.
