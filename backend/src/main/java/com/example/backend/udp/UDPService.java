package com.example.backend.udp;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.nio.ByteBuffer;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class UDPService {

    private DatagramSocket socket;

    public UDPService() {
    }

    public void start() {
        try {
            socket = new DatagramSocket(7501); // Listening on port 7500
            // Start receiving packets in a new thread
            new Thread(this::receiveDatagram).start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PostConstruct
    public void Init() {
        start();
    }

    // Send a datagram with the player ID to a specific host and port
    public void sendDatagram(String host, int port, int equipmentId) {
        if (socket == null) {
            System.err.println("Socket is not initialized. Cannot send datagram.");
            return;
        }
        
        try {
            byte[] sendBuffer = convertIntToByteArray(equipmentId);
            InetAddress address = InetAddress.getByName(host);
            DatagramPacket packet = new DatagramPacket(sendBuffer, sendBuffer.length, address, port);
            socket.send(packet); // Send the datagram
            System.out.println("UDP packet sent with Equipment ID: " + equipmentId + " to " + host + ":" + port);
        } catch (Exception e) {
            e.printStackTrace(); // Handle exceptions appropriately
        }
    }

    // Receive datagrams from the socket
    private void receiveDatagram() {
        if (socket == null) {
            System.err.println("Socket is not initialized. Cannot send datagram.");
            return;
        }

        try {
            byte[] receiveBuffer = new byte[4]; // Buffer to hold incoming datagrams
            while (true) {
                DatagramPacket packet = new DatagramPacket(receiveBuffer, receiveBuffer.length);
                socket.receive(packet); // Receive the packet

                int playerId = convertByteArrayToInt(receiveBuffer);
                System.out.println("Received player ID: " + playerId); // Handle the received ID
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Decode the byte array to an int
    public static int convertByteArrayToInt(byte[] bytes) {
        return ByteBuffer.wrap(bytes).getInt();
    }

    // Encode the int to a byte array
    public static byte[] convertIntToByteArray(int code) {
        return ByteBuffer.allocate(4).putInt(code).array();
    }
}
