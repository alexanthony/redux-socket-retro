import React from 'react'
const createInnerList = (ItemComponent, listPropName, itemPropName) => {
  class InnerList extends React.Component {
    shouldComponentUpdate(nextProps) {
      if (this.props[listPropName] === nextProps[listPropName]) {
        return false
      }
      return true
    }
    render() {
      return this.props[listPropName].map((item, index) => (
        <ItemComponent key={item} index={index} {...{ [itemPropName]: item }} />
      ))
    }
  }
  InnerList.displayName = `InnerList(${ItemComponent.displayName})`
  return InnerList
}

export default createInnerList
