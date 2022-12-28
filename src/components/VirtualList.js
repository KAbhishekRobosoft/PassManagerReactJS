import React from 'react'
import { FlatList,View } from 'react-native'

function VirtualList({data,renderItem,keyExtractor,refreshControl}) {
  return (
    <View>
        <FlatList refreshControl={refreshControl} showsVerticalScrollIndicator={false} data={data} renderItem= {renderItem} keyExtractor={keyExtractor}/>
    </View>
  )
}

export default VirtualList