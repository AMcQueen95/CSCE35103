package com.example.backend.service;

import java.net.DatagramPacket;
import java.net.DatagramSocket;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class UDPService 
{
    @Async
    public void listen() 
    {

        try(DatagramSocket ds = new DatagramSocket(7501)) { //Receiving a single int

            byte[] receive = new byte[4]; 

            DatagramPacket DpReceive = null;
            
            while (true) //Constantly searches for received datagrams
            {
                DpReceive = new DatagramPacket(receive, receive.length); //Packet which recieves data

                ds.receive(DpReceive); //Receives that data in byte buffer

                //Need to include a map of int codes and methods to interact with the database
                //Also need to figure out what is giving the codes to send and the way they are sent
                //and how those things interact with server

                receive = new byte[4]; //Refreshes the byte
            }

        } catch (Exception e)
        {
            e.printStackTrace();
        }
            
    }
}
