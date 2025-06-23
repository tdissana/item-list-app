package com.tharindu.item.list.controller;

import com.tharindu.item.list.payload.ItemDTO;
import com.tharindu.item.list.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/view")
    public ResponseEntity<List<ItemDTO>> viewAllItems() {
        List<ItemDTO> itemDTOS = itemService.getAllItems();
        return new ResponseEntity<>(itemDTOS, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<ItemDTO> addItem(@RequestBody ItemDTO itemDTO) {
        ItemDTO savedItemDTO = itemService.addItem(itemDTO);
        return new ResponseEntity<>(savedItemDTO, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ItemDTO> updateItem(@PathVariable Long id, @RequestBody ItemDTO itemDTO) {
        ItemDTO updateItemDTO = itemService.updateItem(id, itemDTO);
        return new ResponseEntity<>(updateItemDTO, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable Long id) {
        String status = itemService.deleteItem(id);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }
}
