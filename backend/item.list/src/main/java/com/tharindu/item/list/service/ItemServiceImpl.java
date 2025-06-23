package com.tharindu.item.list.service;

import com.tharindu.item.list.exception.ResourceNotFoundException;
import com.tharindu.item.list.payload.ItemDTO;
import com.tharindu.item.list.model.Item;
import com.tharindu.item.list.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService{

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public List<ItemDTO> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return items.stream().map(item -> {
            return new ItemDTO(item.getId(), item.getName());
        }).toList();
    }

    @Override
    public ItemDTO addItem(ItemDTO itemDTO) {
        Item item = new Item();
        item.setName(itemDTO.getName());
        Item savedItem = itemRepository.save(item);
        return new ItemDTO(savedItem.getId(), savedItem.getName());
    }

    @Override
    public ItemDTO updateItem(Long id, ItemDTO itemDTO) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", id));
        item.setName(itemDTO.getName());
        Item savedItem = itemRepository.save(item);
        return new ItemDTO(savedItem.getId(), savedItem.getName());
    }

    @Override
    public String deleteItem(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", id));
        itemRepository.delete(item);
        return "Item with id: " + id + " deleted successfully";
    }
}
