package com.tharindu.item.list.service;

import com.tharindu.item.list.payload.ItemDTO;

import java.util.List;

public interface ItemService {
    ItemDTO addItem(ItemDTO itemDTO);

    List<ItemDTO> getAllItems();

    ItemDTO updateItem(Long id, ItemDTO itemDTO);

    String deleteItem(Long id);
}
