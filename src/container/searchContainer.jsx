import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

const SearchContainer = ({searchList, onSearch}) => {
  const query = new URLSearchParams(useLocation().search)
  const searchQuery = query.get('q')

  useEffect(() => {
    if (searchQuery !== searchList.query)
      onSearch(searchQuery)
  })

  if (searchQuery) return null
  else return (<Redirect to='/'/>)
}

export default SearchContainer;