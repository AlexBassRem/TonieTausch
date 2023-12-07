import React from 'react';

const GenericList = ({ items, renderItem, displayAttributes }) => {
  console.log('Items in GenericList', items);
  console.log('RenderItem in GenericList', renderItem);
  // Funktion, die überprüft, welche Attribute gerendert werden sollen
  const renderFilteredAttributes = (item) => {
    return Object.keys(item)
      .filter(key => displayAttributes.includes(key)) // Filtert Schlüssel basierend auf der Konfiguration
      .map(key => <span key={key}>{item[key]}</span>); // Gibt die gefilterten Attribute zurück
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {renderItem ? renderItem(item) : renderFilteredAttributes(item)}
        </li>
      ))}
    </ul>
  );
};

export default GenericList;
